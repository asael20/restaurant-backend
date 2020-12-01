'use strict'
require('./config/variables')
const cors = require('cors')
const routes = require('../api/routes/index')
const express = require('express');
const app = express();
const fs = require('fs');

(function(){
    if(!fs.existsSync('public')){
        fs.mkdir('public', (err) => {
            if(err) throw 'Error al crear la carpetas', err;
            fs.mkdirSync('public/images');
            fs.mkdirSync('public/images/restaurants');
            fs.mkdirSync('public/images/dishes');
        })
    }

})()


// SETTING SERVER

app.set('port', process.env.PORT);
app.set('basepath', '/tracker-eatery.apiservice')
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(app.get('basepath'),routes)


module.exports = app;