import { isValidEmail, isValidPassword, isValidUsername } from "./isValid.js";

const formDOM = document.querySelector('.form');
const usernameDOM = document.getElementById('username');
const emailDOM = document.getElementById('email');
const passDOM = document.getElementById('pass');
const repassDOM = document.getElementById('repass');
const usernameErrDOM = document.getElementById('username_err');
const emailErrDOM = document.getElementById('email_err');
const passErrDOM = document.getElementById('pass_err');
const repassErrDOM = document.getElementById('repass_err');
const submitDOM = formDOM.querySelector('button');

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitDOM.disabled = true;

    const [uErr, uMsg] = isValidUsername(usernameDOM.value);
    const [eErr, eMsg] = isValidEmail(emailDOM.value);
    const [pErr, pMsg] = isValidPassword(passDOM.value);
    let anyError = false;

    usernameDOM.parentElement.dataset.state = uErr ? 'error' : '';
    if (uErr) {
        usernameErrDOM.textContent = uMsg;
        anyError = true;
    }

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

    const samePass = passDOM.value === repassDOM.value;
    repassDOM.parentElement.dataset.state = !samePass ? 'error' : '';
    if (!samePass) {
        repassErrDOM.textContent = 'Passwords dos not match.';
        anyError = true;
    }

    if (anyError) {
        submitDOM.disabled = false;
        return;
    }

    const response = await fetch(formDOM.action, {
        method: formDOM.method,
        body: JSON.stringify({
            username: usernameDOM.value,
            email: emailDOM.value,
            pass: passDOM.value,
        }),
    });
    const responseData = await response.json();

    console.log(responseData);

    submitDOM.disabled = false;
});