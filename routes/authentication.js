var express = require('express');
var _ = require('lodash');
var db = require('../models/db.js');
var middleware = require('../middleware/middleware')(db);

var routes = express.Router();

routes.route('/')
  // GET Login page form
  .get((req,res,next) => {
    res.render('login');
  })
  // POST login route authentication
  .post((req,res,next) => {
    let userInstance;
    var body = _.pick(req.body,'username','password');
    console.log(body);
    // console.log(db.user);
    // once finish authenticating, getting email and password correct
    // generating token with JWT and and store it in the token db
    // generating jWT is through creating a type and then using
    // crypto to encrypt
    db.user.authenticate(body)
    .then((user) => {
      // console.log(` here in user ${user}`);
      userInstance = user;
      let token = user.generateToken('authenticate');
      console.log(token);
      // create token in token db
      return db.token.create({token:token});
    })
    .then((tokenInstance) => {
      // console.log(tokenInstance);
      // set the token to the header and send the userInstance to the frontend
      // res.header('Auth',tokenInstance.get('token')).json(userInstance.toPublicJSON());
      res.header('Auth', tokenInstance.get('token')).redirect('/');
    })
    .catch((e) => {
      console.log(e);
      res.status(401).json(e)
    });

  });

  // DELETE Logout Delete token in the token db and redirect to login page
  routes.delete('/',middleware.requireAuthenticate,(req,res) => {
    req.token.destroy().then(() => res.redirect('/login'))
    .catch((e) => {
      console.log(e);
      res.status(500).send()
    });
  });




module.exports = routes;
