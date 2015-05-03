var five = require('johnny-five');

module.exports = function (board, io) {

  board.on('ready', function() {

    const buttonTwo = new five.Button(2);
    const buttonFour = new five.Button(4);
    const buttonSix = new five.Button(6);
    const potentiometer = new five.Sensor({
      pin: 'A3',
      freq: 250
    });

    io.on('connection', function (socket) {
      socket.emit('setup', {
        buttonTwo: buttonTwo.value ? 'pressed' : 'released',
        buttonFour: buttonFour.value ? 'pressed' : 'released',
        buttonSix: buttonSix.value ? 'pressed' : 'released',
        potentiometer: potentiometer.value
      });
    });

    buttonTwo.on('down', function() {
      io.sockets.emit('johnny-five', {
        input: 'buttonTwo',
        value: 'pressed'
      });
    });

    buttonTwo.on('up', function() {
      io.sockets.emit('johnny-five', {
        input: 'buttonTwo',
        value: 'released'
      });
    });

    buttonFour.on('down', function() {
      io.sockets.emit('johnny-five', {
        input: 'buttonFour',
        value: 'pressed'
      });
    });

    buttonFour.on('up', function() {
      io.sockets.emit('johnny-five', {
        input: 'buttonFour',
        value: 'released'
      });
    });

    buttonSix.on('down', function() {
      io.sockets.emit('johnny-five', {
        input: 'buttonSix',
        value: 'pressed'
      });
    });

    buttonSix.on('up', function() {
      io.sockets.emit('johnny-five', {
        input: 'buttonSix',
        value: 'released'
      });
    });

    potentiometer.on('data', function() {
      io.sockets.emit('johnny-five', {
        input: 'potentiometer',
        value: this.value
      });
    });

    board.repl.inject({
      buttonTwo: buttonTwo,
      buttonFour: buttonFour,
      pot: potentiometer
    });
  });

};