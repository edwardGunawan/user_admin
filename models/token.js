var cryptoJs = require('crypto-js');

module.exports = (sequelize, DataTypes) => {
  var token = sequelize.define('token', {
    token: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        len:[1]
      },
      set: function(value) {
        // we need to hash the function again when creating the token from JWT
        let hash = cryptoJs.MD5(value).toString();
        this.setDataValue('token', value);
        this.setDataValue('tokenHash',hash);
      }
    },
    tokenHash: DataTypes.STRING
  });
}
