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
    saved: {
        type: Boolean,
        default: false
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "note"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;