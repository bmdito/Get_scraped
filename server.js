var cheerio = require("cheerio");
// var mongojs = require("mongojs");
var axios = require("axios");

console.log("\n********************************\n" +
            "Scraping Data from SITENAME\n" +
            "\n********************************\n"
);

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
    results.push({

        title:title,
        link:link,
        summary:summary
        

        });
        console.log(results);

    });



    
});

