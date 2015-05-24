import _ from 'lodash';

export default function (value) {
  return value.letter + (value.modifier || '') + value.octave;
}
