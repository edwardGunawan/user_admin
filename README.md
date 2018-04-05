# user_admin Dashboard

- CRUD application and input validation
- Using Sequelize for database
- Validation with Nodejs

Simple user admin dashboard that I try to practice for
creating authentication in signing up users, login in, and loging out.

The process of authentication:
  - When user sign in, it will need to authenticate them first, check
  if the email and password is correct by using bcrypt to hash the password to see if it is the same.
  - I store the password using bcrypt hash and creating salt to hash it
  - Generating token. By having dataStore as object of id of users and type that is pass in, encrypt the dataStore with cryptoJs. Sign encrypt data with JWT and jwtSecretWord.
  - Store token in token database: when storing in database, I hash the token again because of sensitive data involve with cryptojs MD5.
  - Every time user need to get into home.ejs, they will need to authenticate, checking if the token exist or not.
  - Inside the middleware.js, it checks token with findTokenById, by verify token with JWT and its secretwords.  Decrypt token with cryptoJs (DataStore object), and search users data with the id that is in DataStore. Set the users to the req.user, and req.token to tokenInstance(that is generate in tokenDB).
  - **Here is the catch when connecting with frontend**: node are not able to set header and redirect. Therefore, I store token in localStorage after generate it and retrieve the token again from DB in the middleware authentication. You can also store it in req.cookie with cookie parser.
  - Loging out by checking authenticate user in the middleware.js, then deleting the token of that user in tokenDB and redirect to login.

### Prerequisites
You need to have nodeJs and npm installed

### Installing
- git clone this repo
- run `npm install`
- run `node server.js` or `npm start`

## Built with
- [Semantic UI CSS framework](https://semantic-ui.com/)
- [node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/package/crypto-js)


## Authors
* **Edward Huang** - [Edward Huang](https://www.edward-huang.com/)
