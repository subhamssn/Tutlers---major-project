module.exports.sign_up = function(req, res){
    return res.render('user-sign-up');
}

module.exports.sign_in = function(req, res){
    return res.render('user-sign-in');
}

module.exports.create = function(req, res){

      res.send('<h1>Sign-Up Post</h1>');

}

module.exports.createSession = function(req, res){
    res.send('<h1>Sign-In Post</h1>');
}