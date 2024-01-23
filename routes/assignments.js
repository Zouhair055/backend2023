//routes-assignement.js
let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)

//try
// function getAssignments(req, res){
//     // Récupérer les paramètres de pagination de la requête
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
    
//     Assignment.paginate({}, { page, limit }, (err, assignments) => {
//         if(err){
//             res.send(err)
//         }
//         res.send(assignments);
//     });
// }
function getAssignments(req, res) {
    // Récupérer les paramètres de pagination et de tri de la requête
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortField = req.query.sortField || 'dateDeRendu';
    const sortOrder = parseInt(req.query.sortOrder) || 1; // 1 for ascending, -1 for descending

    const options = {
        page,
        limit,
        sort: { [sortField]: sortOrder },
    };

    Assignment.paginate({}, options, (err, assignments) => {
        if (err) {
            res.send(err);
        }
        res.send(assignments);
    });
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
    assignment.auteur = req.body.auteur;
    assignment.note = req.body.note;
    assignment.remarques = req.body.remarques;
    assignment.matiere = req.body.matiere;

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