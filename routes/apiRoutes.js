var db = require("../models");
var cheerio = require("cheerio");
var axios = require("axios");

module.exports = function(){
app.get("/", function(req,res){
  db.Article.find({}).then(function(newsscrapes){
    res.render("home" , {articles: newsscrapes});
});
});
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
          
          db.Article.create(result)
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
       res.render("articles" , {articles: newsscrapes});
  });
});
}