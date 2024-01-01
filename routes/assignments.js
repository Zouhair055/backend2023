//routes-assignement.js
const assignment = require('../model/assignment');
let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Shema = mongoose.Schema;

let assignmentShema = Shema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean
});

assignmentShema.plugin(aggregatePaginate);

let Assignment = mongoose.model('assignment', assignmentShema);

module.exports = Assignment;

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    var aggregateQuery = Assignment.aggregate();
    Assignment.aggregatePaginate(
        aggregateQuery, 
        { 
            page: parseInt(req.query.page) || 1, 
            limit: parseInt(req.query.limit) || 10, 
        },
        (err, assignments) => {
            if(err){
                res.send(err);
            }
            res.send(assignments);
        },
    );
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved xd!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted successfully`});
    })
}

// Ajouter après les autres fonctions

// Supprimer tous les assignments (DELETE)
// Vos autres fonctions...

// Supprimer tous les assignments (DELETE)
function deleteAllAssignments(req, res){
    Assignment.deleteMany({}, (err) => {
        if(err){
            res.send(err)
        } else {
            res.send('Tous les devoirs ont été supprimés');
        }
    });
}

module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment, deleteAllAssignments };
