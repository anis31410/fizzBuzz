const express = require('express');
const router = express.Router();
var fs = require('fs'); //require file system object
const { isNull } = require('util');

//modification du nombre présent dans le fichier numbers.json
router.post('/addNumber/:number', (req, res) =>{
    // modifie le fichier numbers.json
     fs.readFile("./numbers.json" , 'utf8', function (err, data) {
        // si erreur
        if(err) {
            return res.status(500).json({
                error: err.message,
                sql: err.sql
            }); 
        }
        // si data null ou undefined
        if(data === null || data === undefined) {
            return res.status(404).json({
                error: 'les données retournées sont nulles ou indéfinies'
            })
        }
        // récupération des données présents dans le fichier numbers.json puis modification de ces données
        data = JSON.parse( data );
        data["number1"] = {
            "id": 1,
            "number": Math.floor(req.params.number)
        };
        // envoie des nouvelles données dans le fichier numbers.json
        fs.writeFileSync("./numbers.json", JSON.stringify(data));
        res.end(JSON.stringify(data));
     });

})

// récupération des données présents dans le fichier numbers.json
router.get('/getNumbers', function(req, res){
    fs.readFile("./numbers.json" , 'utf8', function(err, data){
        if(err) {
            return res.status(500).json({
                error: err.message,
                sql: err.sql
            }); 
        }
        if(data === null || data === undefined) {
            return res.status(404).json({
                error: 'les données retournées sont nulles ou indéfinies'
            })
        }
        res.end(data);
    });
})

module.exports = router;