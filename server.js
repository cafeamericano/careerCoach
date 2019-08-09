//DEPENDENCIES================================================================

const express = require('express');
var bodyParser = require('body-parser')
var handlebars = require('express-handlebars')
var path = require('path')
var app = express()

var PORT = process.env.PORT || 4000;

//EXPRESS PUBLIC FOLDER================================================================

app.use(express.static(__dirname + '/public'));

//BODY PARSER MIDDLEWARE================================================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//HANDLEBARS================================================================

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

//ROUTES================================================================

app.use(require('./controllers/pageServeRoutes.js'))
app.use(require('./controllers/dataPushRoutes.js'))
app.use(require('./controllers/dataPullRoutes.js'))

//START SERVER================================================================

app.listen(PORT, function () {
    console.log(`Server listening on Port ${PORT}...`)
})