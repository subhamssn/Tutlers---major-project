const express = require('express')

const path = require('path');
const port = 8000;

const app = express();

app.get('/', function(req, res){
    return res.send('<h1>Hello There</h1>')
})

app.listen(port, function(err){
    if(err){
        console.log(`Error running the server ${err}`);
        return;
    }

    console.log(`Server running properly on: ${port}`);
});
