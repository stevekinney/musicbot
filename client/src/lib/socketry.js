import d3 from 'd3';
import _ from 'lodash';

import getNoteSignature from './get-signature';
import synthesizer from './synthesizer';

export default function (socket) {
  socket.on('potentiometer', function (data) {
    _(data)
      .pick(value => !!value.letter)
      .mapKeys((value, key) => _.kebabCase(key))
      .mapValues(getNoteSignature)
      .pairs()
      .each(([key, value]) => document.querySelector('.' + key).innerHTML = value)
      .value();
  });

  socket.on('potentiometer', function (data) {
    _(data)
      .pick(value => !!value.letter)
      .mapValues(getNoteSignature)
      .pairs()
      .each(([key, value]) => {
        synthesizer[key].setNote(value);
      })
      .value();
  });

  socket.on('notePressed', function (data) {
    d3.select('.' + _.kebabCase(data.input)).classed('pressed', data.pressed);
  });

  socket.on('notePressed', function (data) {
    const action = data.pressed ? 'start' : 'stop';
    synthesizer[data.input][action]();
  });
}
