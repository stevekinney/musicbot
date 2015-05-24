var socket = io();

var outputs = {
  buttonTwo: $('.button-two'),
  buttonFour: $('.button-four'),
  buttonSix: $('.button-six'),
  potentiometer: $('.potentiometer')
};

socket.on('setup', function (data) {
  console.log(data);
  outputs.buttonTwo.text(data.buttonTwo ? 'pressed' : 'released');
  outputs.buttonFour.text(data.buttonFour ? 'pressed' : 'released');
  outputs.buttonSix.text(data.buttonSix ? 'pressed' : 'released');
  outputs.potentiometer.text(data.potentiometer);
});

socket.on('johnny-five', function (data) {
  outputs[data.input].text(data.pressed);
});
