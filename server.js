/* server.js */

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

const port = process.env.PORT || 5000;
const io = require('socket.io')();
const connections = new Map();
const battles = [];

function isBattleWaiting(battle) {
    const room = io.sockets.adapter.rooms[battle];
    const clients = (typeof room !== 'undefined' ? room.sockets : undefined);
    const numPlayers = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;
    console.log(`${battle} has ${numPlayers} players`);
    return (numPlayers < 2);
}

io.on('connection', function (client) {
    connections.set(client, client);
    console.log('connected ', client.id);

    const waitingBattles = battles.filter(isBattleWaiting);
    let firstWaitingBattle = (waitingBattles.length ? waitingBattles[0] : null);
    let battleToJoin = firstWaitingBattle;

    console.log(`firstWaitingBattle = ${firstWaitingBattle}`);

    if (!battles.length || !firstWaitingBattle) {
        battleToJoin = `battle${battles.length}`;
        console.log(`creating battle${battles.length}`);
        battles.push(battleToJoin);
    }

    client.join(battleToJoin);

    io.to(client.id).emit('battle id', battleToJoin);
    io.in(battleToJoin).clients((err, battlePlayers) => {
        console.log(battlePlayers);
    });

    client.once('disconnect', function () {
        connections.delete(client);
        console.log('disconnected ', client.id);
    });
});

io.listen(port);
console.log('socket.io listening on ', port);

