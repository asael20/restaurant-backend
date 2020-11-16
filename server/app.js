require('./config/variables')
const cors = require('cors')
const routes = require('../api/routes/index')
const express = require('express');
const app = express();

// SETTING SERVER

app.set('port', process.env.PORT);
app.set('basepath', '/tracker-eatery.apiservice')
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(app.get('basepath'),routes)


module.exports = app;