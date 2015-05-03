const five = require('johnny-five');
const board = new five.Board();

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

require('./lib/board')(board, io);

app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('Your server is up and running on Port ' + port + '. Good job!');
});