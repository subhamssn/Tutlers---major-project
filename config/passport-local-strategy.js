const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    
    async function(email, password, done){
        //find a user and establish the identity
      const user = await User.findOne({email: email}).exec();

      

      if(!user || user.password != password){
        console.log('Invalid Username/ Password');
        return done(null, false);
      }

      return done(null, user);
    }
));


// serializing the user to decide which key is to be kept in the cookies.
//cookie m user-id ko store krwate the manual authentication wahi ho rha h, orr encrypted bhi hai.
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done){
    const user = await User.findById(id);

    return done(null, user);
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){

  // if the user is signed in, then pass on the request to the next function(controller's action)
  if(req.isAuthenticated()){
    return next();
  }

  //if the user is not signed in

  return res.redirect('/users/sign-in');
}

//

passport.setAuthenticatedUser = function(req, res, next){
  if(req.isAuthenticated()){
       // req.user contains the current signed in user from the session cookie and we are just 
       //sending this to the locals for the views.
      res.locals.user = req.user;
  }

  return next();
}

module.exports = passport;