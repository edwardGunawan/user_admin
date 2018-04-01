var express = require('express');
var PORT = process.env.PORT || 3000;
var helmet = require('helmet');
var _ = require('lodash');
var app = express();

app.use(helmet());
app.set('view engine', 'ejs');
app.use(express.static('public'));

/*
  GET Index
  frontpage
*/
app.get('/',async(req,res) => {
  res.render('home');
});

/*
  GET/ NEW
    New Form
*/
app.get('/new', async (req,res) => {
  res.render('home');
});

/*
  POST/ CREATE
  create new form
*/
app.post('/new', async (req,res) => {
  res.send('post form');
});

/*
  GET/ SHOW
  show confirmation on recently created user
*/
app.get('/:id', async (req,res) => {
  res.send('confirmation page on create')
});

/*
  GET/ EDIT
  Show edit form
*/
app.get('/:id/edit', async(req, res) => {
  res.send('edit form page');
});

/*
  PUT/ UPDATE
  post update and redirect
*/
app.put('/:id', async(req,res) => {
  res.send('update page')
});

/*
  DELETE/ DELETE
  delete user and redirect
*/
app.delete('/:id', async(req, res) => {
  res.send('delete page');
});

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}!`);
});
