const bcrypt = require('bcrypt');
const _ = require('lodash');
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('user', {
    username : {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    salt : {
      type: DataTypes.STRING
    },
    password_hash: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate:{
        len: [7,100] // the len of the password
      },
      set: function(value) {
        let salt = bcrypt.genSaltSync(10); // generating salt
        let passwordHash = bcrypt.hashSync(value,salt); // hash password with value

        // store all these to DB
        this.setDataValue('password',value);
        this.setDataValue('salt',salt);
        this.setDataValue('password_hash',passwordHash);
      }
    }
  }, {
    hooks: {
      beforeValidate: (user,options) => {
        if(typeof user.username === 'string') {
          user.username = user.username.toLowerCase();
        }
      }
    }
  });
  return users;

}
