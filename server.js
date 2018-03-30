var express = require('express');
var PORT = process.env.PORT || 3000;
var helmet = require('helmet');
var _ = require('lodash');
var app = express();

app.use(helmet());


app.listen(PORT, () => {
  console.log(`Listening to ${PORT}!`);
});
