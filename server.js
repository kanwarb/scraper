var express = require("express");
var mongoose = require("mongoose");
// var cheerio = require("cheerio");
// var axios = require("axios");
var exphbs = require("express-handlebars");
// var db = require("./models");

var path = require("path");

app = express();
PORT = process.env.PORT || 8000


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "/public")));



var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mongoHeadlines" ;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function(){
    console.log("Listening on port " + PORT);
})