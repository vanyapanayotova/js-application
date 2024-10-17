// TODO delete this view.

import { login } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, updateNav } from "../utils.js";

const loginTemp = (submitHandler) => html`
 
  <!-- Login Page ( Only for Guest users ) -->
<section id="login-page" class="auth">
  <form @submit=${submitHandler} id="login">

      <div class="container">
          <div class="brand-logo"></div>
          <h1>Login</h1>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

          <label for="login-pass">Password:</label>
          <input type="password" id="login-password" name="password">
          <input type="submit" class="btn submit" value="Login">
          <p class="field">
              <span>If you don't have profile click <a href="#">here</a></span>
          </p>
      </div>
  </form>
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
