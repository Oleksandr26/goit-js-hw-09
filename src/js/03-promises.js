import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

let positionCounter = 0;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

formRef.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.target.elements;
  let delayEl = delay.value;
  let stepEL = step.value;
  let amountEL = Number(amount.value);

  for (let i = 0; i < amountEL; i++) {
    let totalDelay = Number(delayEl) + Number(stepEL) * i;
    positionCounter = i + 1;
    createPromise(positionCounter, totalDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  event.currentTarget.reset();
}

// const intervalID = setInterval(() => {
//   positionCounter += 1;
//   createPromise(positionCounter, delayEl)
//     .then(({ position, delay }) => {
//       Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//     })
//     .catch(({ position, delay }) => {
//       Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//     });
//   console.log(delayEl);
//   if (amountEL <= positionCounter) {
//     clearInterval(intervalID);
//     return;
//   }
// }, totalDelay);
