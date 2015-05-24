var five = require('johnny-five');
const Octavian = require('octavian');

var notes = require('./notes');

module.exports = function (board, io) {

  board.on('ready', function() {

    const potentiometer = new five.Sensor({
      pin: 'A3',
      freq: 250
    });

    const buttons = {
      rootNote: new five.Button(2),
      minorThird: new five.Button(4),
      majorThird: new five.Button(6),
      perfectFifth: new five.Button(8),
    };

    Object.keys(buttons).forEach(function (key) {
      buttons[key].on('down', function () {
        io.sockets.emit('notePressed', {
          input: key,
          pressed: true
        });
      });

      buttons[key].on('up', function () {
        io.sockets.emit('notePressed', {
          input: key,
          pressed: false
        });
      });
    });

    potentiometer.on('data', function() {
      var note = new Octavian.Note(notes.noteFor(this.value));

      io.sockets.emit('potentiometer', {
        input: 'potentiometer',
        rootNote: note,
        minorThird: note.minorThird(),
        majorThird: note.majorThird(),
        perfectFifth: note.perfectFifth(),
        value: this.value
      });
    });

    board.repl.inject({
      rootNote: buttons.rootNote,
      minorThird: buttons.minorThird,
      majorThird: buttons.majorThird,
      perfectFifth: buttons.perfectFifth,
      pot: potentiometer
    });
  });

};
