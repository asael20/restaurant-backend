const app = require('express')();

app.use(require('./owner.routes'));
app.use(require('./client.routes'));
app.use(require('./restaurant.routes'));

module.exports = app;