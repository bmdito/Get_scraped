var cheerio = require("cheerio");
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
$("h1.headline").each(function(i,element){
    var title = $(element).text();

    var link = $(element).children().attr("href");

    results.push({

        title:title,
        link:link

        });
    console.log(results);    

    });

});

