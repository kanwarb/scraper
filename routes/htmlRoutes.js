'use strict';
var db = require("../models");
var cheerio = require("cheerio");
var axios = require("axios");
var article = require("../models/Article.js");
var note = require("../models/note.js");

module.exports = function(app) {
app.get("/", function(req,res){
    article.find({}).then(function(newsscrapes){
      res.render("home" , {articles: newsscrapes});
  });
});
app.get("/savearticle", function(req,res){
    article.find({}).then(function(newsscrapes){
      res.render("savearticle" , {articles: newsscrapes});
  });
});
}