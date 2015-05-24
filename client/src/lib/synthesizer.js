import createOscillator from './create-oscillator';

export default {
  rootNote: createOscillator(),
  minorThird: createOscillator(),
  majorThird: createOscillator(),
  perfectFifth: createOscillator()
};
