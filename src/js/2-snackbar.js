//imports;
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

const form = document.querySelector('.form');

//make promise
form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = event.target.delay.value;
  const state = event.target.state.value;

  //delay checker
  if (delay < 0) {
    iziToast.error({
      position: 'topRight',
      backgroundColor: '#bd221dff',
      messageColor: '#fff',
      message: 'Please enter a delay greater than 0',
      close: false,
    });
    form.reset();
    return;
  }

  //promise creator
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  //promise handler
  promise
    .then(delayValue => {
      iziToast.success({
        position: 'topRight',
        backgroundColor: '#5cb85c',
        messageColor: '#fff',
        message: `Fulfilled promise in ${delayValue}ms`,
        close: false,
      });
    })
    .catch(delayValue => {
      iziToast.error({
        position: 'topRight',
        backgroundColor: '#bd221dff',
        messageColor: '#fff',
        message: `Rejected promise in ${delayValue}ms`,
        close: false,
      });
    });

  //form reset
  form.reset();
});
