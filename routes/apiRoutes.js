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

    app.get("/addnote", function(req,res){
        res.render("note");
    })
    
    app.put("/article/:id", function(req,res){
        var id = req.params.id;

        db.Article.findByIdAndUpdate(id, {$set: {"saved":true}})
        .then(function(dbArticle){
            res.json(dbArticle);
        });
        
    });

};