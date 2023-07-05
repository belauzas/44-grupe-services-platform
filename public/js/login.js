import { isValidEmail, isValidPassword } from "./isValid.js";

const formDOM = document.querySelector('.form');
const emailDOM = document.getElementById('email');
const passDOM = document.getElementById('pass');
const emailErrDOM = document.getElementById('email_err');
const passErrDOM = document.getElementById('pass_err');
const submitDOM = formDOM.querySelector('button');

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitDOM.disabled = true;

    const [eErr, eMsg] = isValidEmail(emailDOM.value);
    const [pErr, pMsg] = isValidPassword(passDOM.value);
    let anyError = false;

    emailDOM.parentElement.dataset.state = eErr ? 'error' : '';
    if (eErr) {
        emailErrDOM.textContent = eMsg;
        anyError = true;
    }

    passDOM.parentElement.dataset.state = pErr ? 'error' : '';
    if (pErr) {
        passErrDOM.textContent = pMsg;
        anyError = true;
    }

    if (anyError) {
        submitDOM.disabled = false;
        return;
    }

    try {
        const response = await fetch(formDOM.action, {
            method: formDOM.method,
            body: JSON.stringify({
                email: emailDOM.value,
                pass: passDOM.value,
            }),
        });
        const responseData = await response.json();

        console.log(responseData);
    } catch (error) {
        submitDOM.disabled = false;
    }

    submitDOM.disabled = false;
});