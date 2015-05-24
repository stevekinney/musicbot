import audioContext from './audio-context';
import Octavian from 'octavian';

export default function (context = audioContext) {

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  gain.gain.value = 0;

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start(0);

  return {
    start() { gain.gain.value = 1; },
    stop() { gain.gain.value = 0; },

    get frequency() { return oscillator.frequency.value; },
    set frequency(value) { oscillator.frequency.value = value; },

    setNote(note) { this.frequency = (new Octavian.Note(note)).frequency }
  };

}
