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
    var baseURL = "https://www.nytimes.com/section/us";
    
    
     axios.get(baseURL).then(function(response){
        var articlecount =1;
        let counter = 1;
        var $ = cheerio.load(response.data);
        $("div ol li div div a").each(function(i, element){
            var result = {};
            console.log($(this, i)
            .children("h2")
            .text());
            result.headline = $(this)
            .children("h2")
            .text();

            result.summary = $(this)
            .children("p")
            .text();

            result.url =  $(this)
            .attr("href");
            
            db.Articles.create(result)
            .then(function(articles){
            
            })
            .catch(function(err){
                 return err;
            });
           
        });
       console.log(counter);
    });
});

app.get("/articles", function(req,res){
    article = req.body;
    console.log(req.body);
    db.Article.find({}).then(function(newsscrapes){
         res.json(newsscrapes);
    });
});


app.listen(PORT, function(){
    console.log("Listening on port " + PORT);
})