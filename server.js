//DEPENDENCIES================================================================

const express = require('express');
var bodyParser = require('body-parser')
var handlebars = require('express-handlebars')
var path = require('path')
var app = express()

var PORT = process.env.PORT || 4000;

//EXPRESS PUBLIC FOLDER================================================================

app.use(express.static(__dirname + '/app/public')); //This is what the html in the HTML and Handlebars files use

//BODY PARSER MIDDLEWARE================================================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//HANDLEBARS================================================================

app.set('views', path.join(__dirname, '/app/public/handlebars-views'));
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

//ROUTES================================================================

app.use(require('./app/controllers/pageServeRoutes.js'))
app.use(require('./app/controllers/dataPushRoutes.js'))
app.use(require('./app/controllers/dataPullRoutes.js'))
app.use(require('./app/controllers/adminRoutes.js'))
app.use(require('./app/controllers/accountRoutes.js'))

//START SERVER================================================================

app.listen(PORT, function () {
    console.log(`Server listening on Port ${PORT}...`)
})