const express = require('express');
const router = express.Router();
var fs = require('fs'); //require file system object
const { isNull } = require('util');

// GET POST

router.get('/', (req, res) => {
    res.send('POST WORKS');
});

//The addUser endpoint
router.post('/addNumber/:number', (req, res) =>{

    // modifie le fichier numbers.json
     fs.readFile("./numbers.json" , 'utf8', function (err, data) {
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
        data = JSON.parse( data );
        data["number1"] = {
            "id": 1,
            "number": Math.floor(req.params.number)
        };
        fs.writeFileSync("./numbers.json", JSON.stringify(data));
        res.end(JSON.stringify(data));
     });

})

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
        
        res.end(data); // you can also use res.send()
    });
})

module.exports = router;