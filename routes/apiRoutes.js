var express = require("express");
var cheerio = require("cheerio");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
var axios = require("axios");
var db = require("../models");
var app = express();


module.exports = function(app){


app.get("/", function(req,res){
        db.Article.find({}).limit(10)
            .then(function(results){
                var hbObj = {
                    articles: results
                };
                res.render("index", hbObj);
            })
    });


app.get("/scrape", function(req,res){
    //makes axios request for desired site
    
    axios.get("https://www.theonion.com/").then(function(response){
    //establish variable for cheerio access 
        var $ = cheerio.load(response.data);
    
    $("div.post-wrapper").each(function(i,element){
        
        //empty array to save the scraped data
        var result = {};
    
        result.title = $(element).find("h1").text();
    
        result.summary = $(element).find("p").text();
    
        result.link = $(element).find("h1").children().attr("href");
       
        //insert the data into scrapedData db
            db.Article.create(result)
                .then(function(dbArticle){
                    console.log(dbArticle);
                })
                .catch(function(err){
                    console.log(err);
                });
        
            });
            
            res.redirect("/articles");
        });
    });



    app.get("/articles", function(req,res){
        db.Article.find({}).limit(10)
            .then(function(results){
                var hbObj = {
                    articles: results
                };
                res.render("index", hbObj);
            })
    });

    app.get("/saved", function(req,res){
        db.Article.find({"saved":true})
            .then(function(results){
                var hbObj = {
                    articles: results
                };
                res.render("saved", hbObj);
            })

    });

    app.get("/addnote/:id", function(req,res){
        var id = req.params.id;
        db.Article.findOne({"_id":id}).populate("note")
        
        .then(function(results){
            console.log(results);
            var hbObj = {
                articles:results
            }
            res.render("article", hbObj);
        })
        
    })
    
    app.put("/article/:id", function(req,res){
        var id = req.params.id;

        db.Article.findByIdAndUpdate(id, {$set: {"saved":true}})
        .then(function(dbArticle){
            res.json(dbArticle);
        });
        
    });

    app.post("/articles/:id", function(req, res) {
        // Create a new note and pass the req.body to the entry
        db.Note.create(req.body)
          .then(function(dbNote) {
            //   console.log(dbNote);
              
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true }).populate("note");
          })
          .then(function(dbArticle) {
              console.log("db Article", dbArticle);
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
          
      });



    // app.post("/comment/:id", function(req,res){
    //     var user = req.body.name;
    //     var content = req.body.comment;
    //     var articleId = req.params.id;

    //     var commentObj = {
    //         name: user,
    //         body: content
    //     };

    //     var newComment = new Note(commentObj);

    //     newComment.save(function(err, doc){
    //         if(err){
    //             console.log(err);
    //         } else {
    //             console.log(doc._id);
    //             console.log(articleId);

    //             db.Article.findOneAndUpdate(
    //                 {_id: req.params.id},
    //                 {$push: {comment:doc._id}},
    //                 {new:true}
    //             ).exec(function(err,doc){
    //                 if(err){
    //                     console.log(err);
    //                 } else {
    //                     res.redirect("/addnote"+articleId);
    //                 }
    //             })
    //         }
    //     })
    // })

};