// setTimeout(() => {
//   digitalPulse(LED1, true, [300, 300, 300, 300, 300, 300, 300])
// }, 500)

var on = false
setInterval(function () {
  on = !on
  console.log(on)
  digitalWrite(LED1, on)
}, 1000)
