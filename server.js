var express = require("express");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

var db = require("./models");

app = express();
PORT = process.env.PORT || 8000


app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines" ;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/scrape", function(req, res){
    axios.get("https://www.nytimes.com/").then(function(response){

        var $ = cheerio.load(response.data);
        var result = [];
        $("div.css-13mho3u.ol.li.div.div.a").each(function(i, element){
            console.log($(this));

            result.headline = $(this)
            .children("h2")
            .text();

            result.summary = $(this)
            .children("p")
            .text();

            result.url = $(this)
            .attr("href")
            console.log(result);
            db.Article.create(result)
            .then(function(Articles){
                   console.log(Articles);
            })
            .catch(function(err){
                 return err;
            });
        });
        res.send("Scrape Complete");
    });
});

app.get("/articles", function(req,res){
    article = req.body;
    db.Article.find({}).then(function(newsscrapes){
         res.json(newsscrapes);
    });
});


app.listen(PORT, function(){
    console.log("Listening on port " + PORT);
})