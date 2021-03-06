var express = require("express");
var cheerio = require("cheerio");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
var axios = require("axios");

console.log("\n********************************\n" +
            "Scraping Data from SITENAME\n" +
            "\n********************************\n"
);

//require models
var db = require("./models");

var PORT = process.env.PORT || 8080;


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraped";

mongoose.connect(MONGODB_URI);


//Initialize express
var app = express();

//parse request body as JSON
app.use(express.urlencoded({extended:true}));

app.use(express.json());

//set up static folder for web app
app.use(express.static("public"));

var exphbs = require("express-handlebars");
//engine
app.engine("handlebars", exphbs({defaultLayout : 'main'}));
app.set("view engine", "handlebars");

//Database configuration
// mongoose.connect('mongodb://localhost/scraped', {useNewUrlParser: true});

require("./routes/apiRoutes")(app);
// require("./public/assets/javascript/app")(app);



// app.get("/scrape", function(req,res){
// //makes axios request for desired site

// axios.get("https://www.theonion.com/").then(function(response){
// //establish variable for cheerio access 
//     var $ = cheerio.load(response.data);

// $("div.post-wrapper").each(function(i,element){
    
//     //empty array to save the scraped data
//     var result = {};

//     result.title = $(element).find("h1").text();

//     result.summary = $(element).find("p").text();

//     result.link = $(element).find("h1").children().attr("href");
   
//     //insert the data into scrapedData db
//         db.Article.create(result)
//             .then(function(dbArticle){
//                 console.log(dbArticle);
//             })
//             .catch(function(err){
//                 console.log(err);
//             });
    
//         });
        
//         res.redirect("/");
//     });
// });
   


// app.get("/", function(req,res){
//     db.Article.find({}).limit(10)
//         .then(function(results){
//             var hbObj = {
//                 articles: results
//             };
//             res.render("index", hbObj);
//         })
// });



app.listen(3000, function() {
    console.log("App running on port 3000!");
  });