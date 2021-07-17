const SERVER_ADDRESS_GET = 'https://23.javascript.pages.academy/keksobooking/data';
const SERVER_ADDRESS_POST = 'https://23.javascript.pages.academy/keksobooking';
const ALERT_SHOW_TIME = 5000;

const errorAlert = document.querySelector('.ad-form__error');

let data = [];
const getAdverts = () => data;

const getData = async () => {
  let response;
  try {
    response = await fetch(SERVER_ADDRESS_GET);
    if (!response.ok) {
      throw new Error(`{response.status} — ${response.statusText}`);
    }
  } catch (err) {
    errorAlert.classList.remove('hidden'),
    setTimeout(() => {
      errorAlert.classList.add('hidden');
    }, ALERT_SHOW_TIME);
  }
  data = await response.json();
  return data;
};
/*
const getData = (onSuccess) => {
  fetch(SERVER_ADDRESS_GET )
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`{response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then(onSuccess)
    .catch(() => {
      errorAlert.classList.remove('hidden'),
      setTimeout(() => {
        errorAlert.classList.add('hidden');
      }, ALERT_SHOW_TIME);
    });
};
*/
const sendData = (onSuccess, onFail, body) => {
  fetch(
    SERVER_ADDRESS_POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }
      onFail();
    })
    .catch(onFail);
};

export { getData, sendData, getAdverts };
