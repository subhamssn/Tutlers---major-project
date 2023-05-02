const express = require('express')
const router = require('./routes')
const path = require('path');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');



const app = express();



//used for session cookie.
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); 
const MongoStore = require('connect-mongo')(session);

app.use(expressLayouts);
app.use(express.urlencoded());

app.use('/static', express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


const sessionStore = new MongoStore({
    mongooseConnection: db,
    autoRemove: 'disabled'
});


// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'Tutlers',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
           maxAge: (1000*60*100)
    },
    store: sessionStore
    
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);



app.use('/', require('./routes'));
app.use('', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error running the server ${err}`);
        return;
    }

    console.log(`Server running properly on: ${port}`);
});
