/* eslint-disable */
import "@babel/polyfill";
import { displayMap } from "./mapbox";
import { login, logout } from "./login";
import { updateSettings } from "./updateSettings";
import { forgetPassword } from "./forgetPassword";
import { resetPassword } from "./resetPassword";
import { bookTour } from "./stripe";
import { Signup } from "./signup";
import { CommentAdd } from "./commentAdd";
import { likeAdd } from "./likeAdd";
import { likeDelete } from "./likeDelete";

//* DOM Elements
const mapBox = document.getElementById("map");
const signupForm = document.querySelector(".form--signup");
const loginForm = document.querySelector(".form--login");
const logoutBtn = document.querySelector(".nav__el--logout");
const userDataForm = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(".form-user-password");
const forgetMyPassword = document.querySelector(".form--forget");
const resetMyPassword = document.querySelector(".form--reset");
const bookBtn = document.getElementById("book-tour");
const commentForm = document.querySelector(".form--comment");
const likeForm = document.querySelector(".form--like");

//* Delegation
if (mapBox) {
    const locations = JSON.parse(mapBox.dataset.locations);
    displayMap(locations);
}

if (signupForm) {
    signupForm.addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const passwordConfirm = document.getElementById("password-confirm").value;
        Signup(name, email, password, passwordConfirm);
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        login(email, password);
    });
}

if (forgetMyPassword) {
    forgetMyPassword.addEventListener("submit", e => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        forgetPassword(email);
    });
}

if (resetMyPassword) {
    resetMyPassword.addEventListener("submit", e => {
        e.preventDefault();
        const token = document.getElementById("token").value;
        const password = document.getElementById("password").value;
        const passwordConfirm = document.getElementById("password-confirm").value;
        resetPassword(token, password, passwordConfirm);
    });
}

if (logoutBtn) logoutBtn.addEventListener("click", logout);

if (userDataForm) {
    userDataForm.addEventListener("submit", e => {
        e.preventDefault();
        const form = new FormData();
        form.append("name", document.getElementById("name").value);
        form.append("email", document.getElementById("email").value);
        form.append("photo", document.getElementById("photo").files[0]);
        updateSettings(form, "data");
    });
}

if (userPasswordForm) {
    userPasswordForm.addEventListener("submit", async e => {
        e.preventDefault();
        document.querySelector(".btn--save--password").textContent = "Updating...";
        const passwordCurrent = document.getElementById("password-current").value;
        const password = document.getElementById("password").value;
        const passwordConfirm = document.getElementById("password-confirm").value;
        await updateSettings({ passwordCurrent, password, passwordConfirm }, "password");
        document.querySelector(".btn--save--password").textContent = "SAVE PASSWORD";
        document.getElementById("password").value = "";
        document.getElementById("password-current").value = "";
        document.getElementById("password-confirm").value = "";
    });
}

if (bookBtn) {
    bookBtn.addEventListener("click", e => {
        e.target.textContent = "Processing...";
        const { tourId } = e.target.dataset;
        bookTour(tourId);
    });
}

if (commentForm) {
    let rating = 1;
    document.getElementById("ratings").addEventListener("change", e => {
        rating = e.target.value;
    });

    commentForm.addEventListener("submit", e => {
        e.preventDefault();
        const review = document.getElementById("comment").value;
        const tour = document.getElementById("submit").getAttribute('data-tour-id');
        const user = document.getElementById("submit").getAttribute('data-user-id');
        CommentAdd(review, Number(rating), tour, user);
    });
}

if (likeForm) {
    document.querySelectorAll('.btn#like').forEach(function (button) {
        button.addEventListener('click', function () {
            const tour = button.getAttribute('data-tour-id');
            const user = button.getAttribute('data-user-id');
            likeAdd(true, tour, user);
        });
    });
}

if (likeForm) {
    document.querySelectorAll('.btn#unlike').forEach(function (button) {
        button.addEventListener('click', function () {
            const likeID = button.getAttribute('data-like-id');
            likeDelete(likeID);
        });
    });
}

