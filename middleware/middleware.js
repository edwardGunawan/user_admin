const cryptoJs = require('crypto-js');
module.exports = function(db){
  return {
    timeStamp : (req,res,next) => {
      console.log(`${req.method} --- ${req.path} : ${new Date().toDateString()}`);
      next();
    },
    // get the authentication from req.get('auth') if the header key is auth
    // hash with cryptoJS on md5 and find the token Instance
    // from tokenInstance get the user by findByToken instanceMethods
    // set the user to req.user
    requireAuthenticate: (req,res,next) => {
    }
  }

}
