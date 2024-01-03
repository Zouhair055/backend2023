// assignment.js
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate-v2');

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    auteur: String,
    note: Number,
    remarques: String,
    matiere: String,
});

AssignmentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Assignment', AssignmentSchema);