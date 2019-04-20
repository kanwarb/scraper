var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    headline: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "note"
    }
});

var article = mongoose.model("article", ArticleSchema);

module.exports = article;