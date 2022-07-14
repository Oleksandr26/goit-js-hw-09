import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  timer: document.querySelector('.timer'),
};

refs.timer.style.display = 'flex';
refs.timer.style.gap = '30px';
refs.days.style.fontSize = '30px';
refs.days.style.display = 'flex';
refs.hours.style.fontSize = '30px';
refs.hours.style.display = 'flex';
refs.minutes.style.fontSize = '30px';
refs.minutes.style.display = 'flex';
refs.seconds.style.fontSize = '30px';
refs.seconds.style.display = 'flex';
refs.btn.disabled = true;
Notify.info('Please choose a date');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    if (selectedDate < Date.now()) {
      refs.btn.disabled = true;
      Notify.failure('Please choose a date in the future');
    } else {
      refs.btn.disabled = false;
    }
  },
};

flatpickr(refs.input, options);

refs.btn.addEventListener('click', () => {
  refs.btn.disabled = true;
  const selectedTime = Date.parse(refs.input.value);

  let timerId = setInterval(() => {
    const remainingTime = selectedTime - Date.now();
    updateTime(convertMs(remainingTime));
    if (Math.floor(remainingTime / 1000) <= 0) {
      Notify.success('COMPLETED!!!', {
        timeout: 2500,
      });
      clearInterval(timerId);
      return;
    }
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function updateTime(date) {
  Object.entries(date).forEach(([key, value]) => {
    refs[key].textContent = addLeadingZero(value);
  });
}
