var socket = io();

var outputs = {
  buttonTwo: $('.button-two'),
  buttonFour: $('.button-four'),
  buttonSix: $('.button-six'),
  potentiometer: $('.potentiometer')
};

socket.on('setup', function (data) {
  console.log(data);
  outputs.buttonTwo.text(data.buttonTwo);
  outputs.buttonFour.text(data.buttonFour);
  outputs.buttonSix.text(data.buttonSix);
  outputs.potentiometer.text(data.potentiometer);
});

socket.on('johnny-five', function (data) {
  outputs[data.input].text(data.value);
});