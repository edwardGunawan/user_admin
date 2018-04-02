const express = require('express');
const app = express();
const userRoutes = require('./routes/index.js');
const authRoutes = require('./routes/authentication.js');
const _ = require('lodash');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var helmet = require('helmet');
var db = require('./models/db.js');
const middleware = require('./middleware/middleware');


app.use(helmet());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); // postman post request is working
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(middleware.timeStamp);

//// all routes users and authentication separating different routes
app.use('/',userRoutes);
app.use('/login', authRoutes);


db.sequelize.sync({}).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening to ${PORT}!`);
  });
});
