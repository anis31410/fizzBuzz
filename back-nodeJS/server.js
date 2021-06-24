const express = require('express');
const path = require('path');
const app = express();
const numbers = require('./routes/numbers');

app.use(express.static(path.join(__dirname, './dist')));
app.use('/numbers', numbers);


// catch all other routes requests and return it to the index
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})



const port = process.env.PORT || 4600

app.listen(port, (req, res) => {
    console.log(`RUNNING on port ${port}`);
});