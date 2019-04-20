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
        ref: "Note"
    }
});

var Articles = mongoose.model("Articles", ArticleSchema);
module.exports = Articles;