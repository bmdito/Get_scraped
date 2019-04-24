var mongoose = require("mongoose");

//save reference to schema construcor
var Schema = mongoose.Schema;

//create a new NoteSchema

var NoteSchema = new Schema ({
    title:String,
    comment: String
});

//create model from schema above using mongoose modeling
var Note = mongoose.model("Note", NoteSchema);

//export the note model
module.exports = Note;
