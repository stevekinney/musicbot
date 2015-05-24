var d3 = require('d3');

var notes = [
  'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
  'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
  'C5'
];

var scale = d3.scale.linear().domain([0, 1023]).range([0, notes.length - 1]);

module.exports = {
  notes: notes,
  noteFor: function (value) {
    return notes[Math.floor(scale(value))];
  }
};
