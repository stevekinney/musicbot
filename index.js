const five = require('johnny-five');
const board = new five.Board();

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const path = require('path');

require('./lib/board')(board, io);

app.use(express.static('client'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

http.listen(port, function(){
  console.log('Your server is up and running on Port ' + port + '. Good job!');
});
