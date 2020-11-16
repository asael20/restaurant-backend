'use strict';
const app = require('./server/app')
// Main location where run my app (server)

function startServer(){
    console.log(`the server is running on http://localhost:${app.get('port')}${app.get('basepath')}`)
}

app.listen(app.get('port'), startServer);