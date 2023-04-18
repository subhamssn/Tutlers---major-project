const express = require('express')
const router = require('./routes')
const path = require('path');
const port = 8000;


const app = express();

app.use('/static', express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', require('./routes'));
app.use('', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error running the server ${err}`);
        return;
    }

    console.log(`Server running properly on: ${port}`);
});
