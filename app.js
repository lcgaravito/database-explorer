const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Importing routes
const indexRoutes = require('./routes/index');

// Settings
process.env.PORT = process.env.PORT || 3000; //Port
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Middlewares
app.use(express.urlencoded({ extended: false }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Routes
app.use('/', indexRoutes);


app.listen(process.env.PORT, () => {
    console.log('Server listening on port: ', process.env.PORT);
});