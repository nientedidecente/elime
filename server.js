/* server.js */

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
const battles = [];

function getFirstWaitingBattle(battles) {
    let i = 0;
    let result = null;
    battles.forEach(battle => {
        let room = io.sockets.adapter.rooms[battle];
        let clients = (typeof room !== 'undefined' ? room.sockets : undefined);
        let numPlayers = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;
        console.log(`${battle} has ${numPlayers} players`);
        if (!result && (numPlayers < 2 || !numPlayers)) {
            console.log(`found battle${i} waiting`);
            result = battle;
        } else {
            i++;
        }
    });
    return result;
}

io.on('connection', function (c) {

    connections.set(c, c);
    console.log('connected ', c.id);

    let firstWaitingBattle = getFirstWaitingBattle(battles);
    let battleToJoin = firstWaitingBattle;
    console.log(`firstWaitingBattle = ${firstWaitingBattle}`);
    if (!battles.length || !firstWaitingBattle) {
        battleToJoin = `battle${battles.length}`;
        console.log(`creating battle${battles.length}`);
        battles.push(battleToJoin);
    }
    io.to(c.id).emit('battle id', battleToJoin);
    c.join(battleToJoin);
    io.in(battleToJoin).clients((err, clients) => {
        console.log(clients);
    });


    c.once('disconnect', function () {
        connections.delete(c);
        console.log('disconnected ', c.id);
    });

});

io.listen(port);
console.log('socket.io listening on ', port);

