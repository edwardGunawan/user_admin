var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
var db = require('./../models/db.js');




var routes = express.Router();
// routes.use(bodyParser.urlencoded({extended:true}));

/*
  GET Index
  frontpage
*/
routes.get('/',async(req,res) => {
  try {
    // get all the user and render it in home.ejs
    const profile = await db.user.all();
    // console.log(profile);
    res.render('home', {profile:profile});
  } catch (e) {
    console.log(e.message);
  }
});

/*
  GET/ NEW
    New Form
*/
routes.get('/new', async (req,res) => {
  res.render('new');
});

/*
  POST/ CREATE
  create new form
*/
routes.post('/new', async (req,res) => {
  try {
    console.log(req.body);
    let newUser = _.pick(req.body,'username','password');
    const user = await db.user.create(newUser)
    res.redirect('/');
  }catch (e) {
    res.status(500).render('error',{e:e});
    console.log(e.message);
  }

});

/*
  GET/ SHOW
  show confirmation on recently created user
*/
routes.get('/:id', async (req,res) => {
  try {
    console.log(req.params.id);
    const userProfile = await db.user.findById(req.params.id);
    res.render('user-profile',{userProfile:userProfile});
  } catch(e) {
    res.status(400).render('error',{e:e});
  }

});

/*
  GET/ EDIT
  Show edit form
*/
routes.get('/:id/edit', async(req, res) => {
  res.send('show edit form page');
});

/*
  PUT/ UPDATE (we don't need to update because )
  post update and redirect
*/
// routes.put('/:id', async(req,res) => {
//   res.send('update page and redirect to Index')
// });

/*
  DELETE/ DELETE
  delete user and redirect
*/
routes.delete('/:id', async(req, res) => {
  try {
    // destroy user in database
    const rowsDeleted = await db.user.destroy({where:{id : req.params.id}});
    console.log(rowsDeleted);
    if(rowsDeleted === 0) {
      res.status(404).json({
        error: `No user with the id ${req.params.id}`
      });
    } else {
      res.status(204);
      res.redirect('/');
    }
  } catch (e) {
    res.status(500);
    res.render('error',{e:e});
  }
});

module.exports = routes;
