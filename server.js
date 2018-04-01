const express = require('express');
const app = express();
const routes = require('./routes');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var helmet = require('helmet');
var db = require('./models/db.js');


app.use(helmet());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use('/',routes);

db.sequelize.sync({force:true}).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening to ${PORT}!`);
  });  
});
