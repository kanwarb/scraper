var express = require("express");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

var db= ("../models");

app = express();
PORT = process.env.PORT || 8000


app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

app.get("/scrape", function(req, res){
    axios.get("https://www.nytimes.com/").then(function(response){
        var $ = cheerio.load(response.data);

        $("section h2").each(function(i, element){

            var result = [];
            result.headling = $(this)
            .children("a")
            .text();

            result.summary = $(this)
            .children("a")
            .attr("p");

            result.url = $(this)
            .children("a")
            .attr("href")

            db.Article.create(result)
            .then(function(Articles){
                    res.json(Articles);
            })
            .catch(function(err){
                 return err;
            });
        });
        res.send("Scrape Complete");
    });
});


app.listen(PORT, function(){
    console.log("Listening on port " + PORT);
})