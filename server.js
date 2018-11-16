const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var http = require('http').Server(app);
var io = require('socket.io')(http);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
  console.log('got called!');
});

io.on('connection', function(socket){
  console.log('a user connected');
});