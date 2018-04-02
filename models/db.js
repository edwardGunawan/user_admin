const Sequelize = require('sequelize');

const sequelize = new Sequelize(undefined,undefined,undefined, {
  'dialect': 'sqlite',
  'storage': __dirname+'/../data/dev-user-admin.sqlite'
});


var db = {};

db.user = sequelize.import('user.js');
db.token = sequelize.import('token.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
