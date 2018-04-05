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
      // getting token from localStorage
      var token = db.localStorage.getItem('Auth') || ''; //req.get('Auth') || '';
      console.log(`token : ${token}`);
      console.log(`MD5 encrypted token ${cryptoJs.MD5(token).toString()}`);
      let hashed = cryptoJs.MD5(token).toString();
      db.token.findOne({
        where: { // finding tokenHash and get the id of that tokenHash
          tokenHash: hashed
        }
      })
      .then((tokenInstance) => {
        console.log(tokenInstance);
        if(!tokenInstance) throw new Error();
        // console.log('go throug here');
        req.token = tokenInstance;
        return db.user.findByToken(token);
      })
      .then((user) => {
        req.user = user; // set the request user so it is able to retrieve info later
        next();
      })
      .catch((e) => {
        console.log(e);
        res.redirect(401,'/login')
      });
    }
  }

}
