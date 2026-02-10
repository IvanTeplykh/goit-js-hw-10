//imports;
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const startBtn = document.querySelector('button[data-start]');
const resetBtn = document.querySelector('button[data-reset]');
const datetimePicker = document.querySelector('#datetime-picker');
let seconds = document.querySelector('span[data-seconds]');
let minutes = document.querySelector('span[data-minutes]');
let hours = document.querySelector('span[data-hours]');
let days = document.querySelector('span[data-days]');
let selectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = Date.parse(selectedDates[0]);
    const currentDate = Date.now();
    if (selectedDate < currentDate) {
      iziToast.error({
        position: 'topRight',
        backgroundColor: '#bd221dff',
        messageColor: '#fff',
        message: 'Please choose a date in the future',
        close: false,
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

// flatpickr init
flatpickr(datetimePicker, options);

// convertMs function
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

// startBtn event listener
startBtn.addEventListener('click', () => {
  datetimePicker.disabled = true;
  startBtn.disabled = true;
  resetBtn.disabled = false;
  timeRender();
  const intervalId = setInterval(() => setTimer(intervalId), 1000);
});

resetBtn.addEventListener('click', () => {
  reset();
  selectedDate = null;
});

//functions
function setTimer(intervalId) {
  timeRender();
  if (selectedDate - Date.now() < 1000) {
    clearInterval(intervalId);
    reset(intervalId);
  }
}

function reset(intervalId) {
  datetimePicker.disabled = false;
  resetBtn.disabled = true;
  clearInterval(intervalId);
  seconds.textContent = '00';
  minutes.textContent = '00';
  hours.textContent = '00';
  days.textContent = '00';
}

function timeRender() {
  const timeComponents = convertMs(selectedDate - Date.now());
  seconds.textContent = timeComponents.seconds.toString().padStart(2, '0');
  minutes.textContent = timeComponents.minutes.toString().padStart(2, '0');
  hours.textContent = timeComponents.hours.toString().padStart(2, '0');
  days.textContent = timeComponents.days.toString().padStart(2, '0');
}
