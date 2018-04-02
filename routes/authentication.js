var express = require('express');
var _ = require('lodash');
var db = require('../models/db.js');

var routes = express.Router();

routes.route('/')
  // GET Login page form
  .get((req,res,next) => {

  })
  // POST login route authentication
  .post((req,res,next) => {
    let userInstance;
    // once finish authenticating, getting email and password correct
    // generating token with JWT and and store it in the token db
    // generating jWT is through creating a type and then using
    // crypto to encrypt
    db.user.authentication(req.body)
    .then((user) => {
      let userInstance = user;
      let token = user.generateToken('authenticate');
      // create token in token
      return db.token.create({token:token});
    })
    .then((tokenInstance) => {
      // set the token to the header and send the userInstance to the frontend
      res.header('Auth',tokenInstance.get('token')).json(userInstance.toPublicJSON());
    })
    .catch(e => res.status(401).json(e));

  })
  // DELETE Logout Delete token
  .delete((req,res,next) => {

  });




module.exports = routes;
