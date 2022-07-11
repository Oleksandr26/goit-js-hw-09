const startBtnRef = document.querySelector('[data-start]')
const stopBtnRef = document.querySelector('[data-stop]')

startBtnRef.addEventListener('click', startChangeColor)
stopBtnRef.addEventListener('click', stopChangeColor)
stopBtnRef.disabled = true

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startChangeColor() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000);
    startBtnRef.disabled = true
    stopBtnRef.disabled = false
}

function stopChangeColor() {
    clearInterval(timerId)
    startBtnRef.disabled = false
    stopBtnRef.disabled = true
}