var mongoose = require('mongoose');

//save a reference to the schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    },    
    summary: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: "comId"
    }
    
});

//creates model from above schema using mongoose's modeling
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
