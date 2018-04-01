var express = require('express');
var _ = require('lodash');
var db = require('./../models/db.js');

var routes = express.Router();
/*
  GET Index
  frontpage
*/
routes.get('/',async(req,res) => {
  res.render('home');
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
    res.send(user);

  }catch (e) {
    console.log(e.message);
  }

});

/*
  GET/ SHOW
  show confirmation on recently created user
*/
routes.get('/:id', async (req,res) => {
  res.send('confirmation page on create')
});

/*
  GET/ EDIT
  Show edit form
*/
routes.get('/:id/edit', async(req, res) => {
  res.send('edit form page');
});

/*
  PUT/ UPDATE
  post update and redirect
*/
routes.put('/:id', async(req,res) => {
  res.send('update page')
});

/*
  DELETE/ DELETE
  delete user and redirect
*/
routes.delete('/:id', async(req, res) => {
  res.send('delete page');
});

module.exports = routes;
