const port = process.env.PORT || 5000;
const io = require('socket.io')();

/*
const express = require('express');
const app = express();
var http = require('http').Server(app);
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
  console.log('got called!');
});
*/
const connections = new Map();

io.on('connection', function (c) {

    connections.set(c, c);
    console.log('connected ', c.id);

    c.once('disconnect', function () {
        connections.delete(c);
        console.log('disconnected ', c.id);
    });

});

io.listen(port);
console.log('socket.io listening on ', port);
