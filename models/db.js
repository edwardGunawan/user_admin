const Sequelize = require('sequelize');

const sequelize = new Sequelize(undefined,undefined,undefined, {
  'dialect': 'sqlite',
  'storage': __dirname+'/../data/dev-user-admin.sqlite'
});


var db = {};

// if(typeof localStorage === 'undefined' || localStorage === null){
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch'); // from root create scratch folder
// }

db.user = sequelize.import('user.js');
db.token = sequelize.import('token.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.localStorage = localStorage; // setting up localStorage to save token

module.exports = db;
