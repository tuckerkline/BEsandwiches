var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')
var passport = require('passport')

var User = require('../models/users.js')
var Sandwich = require('../models/sandwiches.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/html/template.html', {root: './public'})
});

router.post('/signup', function(req, res){
    bcrypt.genSalt(10, function(error, salt){
        bcrypt.hash(req.body.password, salt, function(hashError, hash){
            var newUser = new User({
                username: req.body.username,
                password: hash,
            });
            newUser.save(function(saveErr, user){
                if ( saveErr ) { res.send({ err:saveErr }) }
                else { 
                    req.login(user, function(loginErr){
                        if ( loginErr ) { res.send({ err:loginErr }) }
                        else { res.send({success: 'success'}) }
                    })
                }
            })
            
        })
    })
})

router.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send({error : 'something went wrong :('}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send({success:'success'});
        });
    })(req, res, next);
})

router.get('/logout', function(req, res){
  req.logout();
  res.send('goodbye');
});

router.get('/me', function(req, res) {
    console.log(req.user)
    res.send(req.user)
})

router.post('/sandwichAdd', function(req, res) {
    var newSandwich = new Sandwich({
        name        : req.body.name,
        ingredients : req.body.ingredients,
        recipe      : req.body.recipe,
        picture     : req.body.picture,
        creator     : req.user.username
    })
    newSandwich.save(function(err, doc) {
        res.send(doc)
    })
    
})

router.get('/allsandwiches', function(req, res) {
    Sandwich.find({}).exec(function(err, docs) {
        res.send(docs)
        console.log(docs)
    })
})

module.exports = router;
