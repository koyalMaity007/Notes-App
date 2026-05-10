const beep =
  new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");

export function playSound() {
  beep.play();
}

export function vibrate() {
  if (navigator.vibrate) {
    navigator.vibrate(300);
  }
}