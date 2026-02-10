//imports;
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

const form = document.querySelector('.snackbar-form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = event.target.delay.value;
  const state = event.target.state.value;
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
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve() : reject();
    }, delay);
  });
  promise
    .then(() => {
      iziToast.success({
        position: 'topRight',
        backgroundColor: '#5cb85c',
        messageColor: '#fff',
        message: `Fulfilled promise in ${delay}ms`,
        close: false,
      });
    })
    .catch(() => {
      iziToast.error({
        position: 'topRight',
        backgroundColor: '#bd221dff',
        messageColor: '#fff',
        message: `Rejected promise in ${delay}ms`,
        close: false,
      });
    });
  form.reset();
});
