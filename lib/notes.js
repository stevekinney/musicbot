var d3 = require('d3');

var notes = [
  'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3',
  'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
  'C5'
];

var scale = d3.scale.linear().domain([0, 1023]).range([0, notes.length - 1]);

module.exports = {
  notes: notes,
  noteFor: function (value) {
    return notes[Math.floor(scale(value))];
  }
};
