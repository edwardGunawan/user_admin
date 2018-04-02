const bcrypt = require('bcrypt');
const _ = require('lodash');
const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const jwtSecretWord = 'shh';
const encryptSecretWord = 'abc123#$';
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
    },
    classMethods: {
      // body is the req.body
      // get the email and the password to be valid and check
      // for hash bcrypt to see if it is valid or not
      authentication:  (body) => {
        return new Promise((resolve, reject) => {
          if(body.hasOwnProperty('username') && body.hasOwnProperty('password')
          && typeof body.username === 'string' && typeof body.password === 'string' ){
            body.username = body.username.toLowerCase();
            users.findOne({
              where: body.username
            }).then((user) => {
              // check if the user is the right password or not
              if(!user || bcrypt.compareSync(body.password,user.get('password_hash'))) {
                reject();
              }
              resolve(user);
            }).catch(e => reject());
          }else {
            reject();
          }
        });
      },
      // Decrypt token with JWT
      // Get the encrypted token
      // decrypt the token again with cryptojs
      // find users from the id attribute of tokenData
      findByToken: (token) => {
        return new Promise((resolve,reject) => {
          try {
            let decodeToken = jwt.verify(token,jwtSecretWord);
            var bytes = cryptoJs.AES.decrypt(decodeToken.token,encryptSecretWord);

            // convert to json
            let tokenData = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));

            // fin
            users.findById(tokenData.id).then((user) => {
              if(user) resolve(user);
              else reject() // if there is no users
            }).catch(e => reject()); // if findById fails
          } catch (e) {
            reject(); // if token has a problem
          }
        });
      }
    },
    instanceMethods: {
      // render to publicJSON without the salt and the password, only
      // username and createdAt
      toPublicJSON: function() {
        let json = this.toJSON();
        return _.omit(json,['salt', 'password_hash','password']);
      },
      // Check type if it is string or not with lodash
      // create JSON by having id of the user and the type
      // encrypt the data using cryptoJS
      // use JWT to sign to create new token and return it
      generateToken: function(type) {
        if(! _.isString(type)){
          return undefined;
        }
        try {
          // create JSON through user id
          let stringData = JSON.stringify({
            id: this.get('id'),
            type
          });
          // encrypt data with second argument as secret key
          let encrypted = cryptoJs.AES.encrypt(stringData,encryptSecretWord).toString();

          // create token
          let token = jwt.sign({token:encrypted},jwtSecretWord);
          return token;
        }catch (e) {
          return undefined;
        }
      }
    }
  });
  return users;

}
