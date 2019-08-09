const express = require('express');
var bodyParser = require('body-parser')
var handlebars = require('express-handlebars')
var path = require('path')
var app = express()

//EXPRESS PUBLIC FOLDER================================================================

app.use(express.static(__dirname + '/public'));

//BODY PARSER MIDDLEWARE================================================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//HANDLEBARS================================================================

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({ defaultLayout: 'standard' }))
app.set('view engine', 'handlebars');

//ROUTES================================================================

var pageServeRoutes = require('./routing/pageServeRoutes.js')
var dataPushRoutes = require('./routing/dataPushRoutes.js')
var dataPullRoutes = require('./routing/dataPullRoutes.js')

app.use(pageServeRoutes)
app.use(dataPushRoutes)
app.use(dataPullRoutes)

//START SERVER================================================================

app.listen(4000, function () {
    console.log('Server listening on Port 4000...')
})