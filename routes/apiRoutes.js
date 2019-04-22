'use strict';
var db = require("../models");
var cheerio = require("cheerio");
var axios = require("axios");
var article = require("../models/Article.js");
var note = require("../models/note.js");

module.exports = function(){

app.get("/scrape", function(req, res){
  var baseURL = "https://www.nytimes.com/section/us";
  
  
   axios.get(baseURL).then(function(response){
      var articlecount =1;
      let counter = 1;
      var $ = cheerio.load(response.data);
      $("div ol li div div a").each(function(i, element){
          var result = {};

          result.headline = $(this)
          .children("h2")
          .text();

          result.summary = $(this)
          .children("p")
          .text();

          result.url = baseURL + $(this)
          .attr("href");
          
          article.create(result)
          .then(function(articles){
          
          })
          .catch(function(err){
               return err;
          });
         
      });
  });
});

app.get("/articles", function(req,res){
  article = req.body;
  article.find({}).then(function(newsscrapes){
       res.render("articles" , {articles: newsscrapes});
  });
});


app.get("/saved", function(req,res){
  article = req.body;
  console.log(req.body);
  article.findAll({
     where: {
       saved: true
     }
  }).then(function(newsscrapes){
       res.render("articles" , {articles: newsscrapes});
  });
});

app.put("/savearticle", function (req, res) {
  console.log(req.body.data.id);
  var result = {};
  result.id = req.body.data.id;
  result.saved = true;
  console.log(result.id, result.saved);
   return article.findOneAndUpdate({_id: result.id}, { saved: result.saved}).then(function(response){
    res.json(response);
  }) 
});


app.post("/articles/:id", function(req,res){
  note.create(req.body).then(function(response){
     return article.findOneAndUpdate({_id: req.params.id}, { note: response._id}, { new: true});
  }).then(function(result){
      res.json(result);
  })
});

app.delete("/deletearticle", function (req, res) {

  article.findOneAndRemove({
      '_id': req.body.id
  }, function (err, doc) {
      if (err) {
          res.json(err);
      }
      else {
          res.json(doc);
      }
  });
});

app.delete("/removenote", function(req,res){
  var result = {};
  result._id = req.body._id;
  note.findOneAndRemove({
    "_id": result._id
  }).then(function(response){
     res.json(response);
  })
});

app.post("/note", function(req,res){
  if(req.body){
    console.log(req.body);
      var newNote = new note(req.body);
      newNote.save(function(error,doc){
        if(error) throw error;
        res.json(doc);
      });
  };
});

app.get("/readnote/:id?", function(req,res){
  note.find({
    "_id": req.params.id
  }).then(function(response){
      res.send(response);
  });
});
}