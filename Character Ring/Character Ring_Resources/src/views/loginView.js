// TODO delete this view.

import { login } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, updateNav } from "../utils.js";

const loginTemp = (submitHandler) => html`
  <!-- Login Page (Only for Guest users) -->
  <section id="login">
    <div class="form">
      <img class="border" src="./images/border.png" alt="">
      <h2>Login</h2>
      <form @submit=${submitHandler} class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="#">Create an account</a>
        </p>
      </form>
      <img class="border" src="./images/border.png" alt="">
    </div>
  </section>`;



export function loginView(ctx) {
    render(loginTemp(createSubmitHandler(onLogin)));
}

async function onLogin({ email, password }) {
  if (!email || !password) {
      return alert('All fields are required!');
  }

  console.log("inLogin");

  await login(email, password);
  updateNav();
  page.redirect('/');
}
