var express = require("express");
var cheerio = require("cheerio");
var mongojs = require("mongojs");
var axios = require("axios");

console.log("\n********************************\n" +
            "Scraping Data from SITENAME\n" +
            "\n********************************\n"
);

//Initialize express
var app = express();

//Database configuration
var databaseURL = "scraped";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseURL, collections);


//makes axios request for desired site

axios.get("https://www.theonion.com/").then(function(response){
//establish variable for cheerio access 
    var $ = cheerio.load(response.data);

//empty array to save the scraped data
    var results = [];

//
$("div.post-wrapper").each(function(i,element){
    var title = $(element).find("h1").text();

    var link = $(element).find("h1").children().attr("href");

    var summary = $(element).text();

    //if it contains title,link, and summary, send to db
    if(title && link && summary){
    
    //insert the data into scrapedData db
        db.scrapedData.insert({
            title:title,
            link:link,
            summary:summary
        },
        function(err, inserted){
            if(err){
                console.log(err);
            }
            else{
                console.log(inserted);
            }
        });
    }
        

    });



    
});

