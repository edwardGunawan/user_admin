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
      console.log(`geenerate token in login ${token}`);
      // create token in token db
      return db.token.create({token:token});
    })
    .then((tokenInstance) => {
      // console.log(tokenInstance);
      // set the token to the header and send the userInstance to the frontend
      // setting token on header and redirect doesn't work in node, store in localStorage and
      // send it as a header in API request
      // res.header('Auth',tokenInstance.get('token')).json(userInstance.toPublicJSON());

      db.localStorage.setItem('Auth',tokenInstance.get('token'));
      // console.log('localstorage',localStorage.getItem('Auth'));
      res.redirect(302,'/');
    })
    .catch((e) => {
      console.log(e);
      res.status(401).json(e)
    });

  });

  // DELETE Logout Delete token in the token db and redirect to login page
  routes.delete('/',middleware.requireAuthenticate,(req,res) => {
    req.token.destroy().then(() => {
      db.localStorage.removeItem('Auth'); // remove token from localStorage
      res.redirect('/login')
    }).catch((e) => {
      console.log(e);
      res.status(500).send()
    });
  });




module.exports = routes;
