
import { register } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, updateNav } from "../utils.js";

const registerTemp = (submitHandler) => html`

  <!-- Register Page ( Only for Guest users ) -->
<section id="register-page" class="content auth">
  <form @submit=${submitHandler} id="register">
      <div class="container">
          <div class="brand-logo"></div>
          <h1>Register</h1>

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="maria@email.com">

          <label for="pass">Password:</label>
          <input type="password" name="password" id="register-password">

          <label for="con-pass">Confirm Password:</label>
          <input type="password" name="confirm-password" id="confirm-password">

          <input class="btn submit" type="submit" value="Register">

          <p class="field">
              <span>If you already have profile click <a href="#">here</a></span>
          </p>
      </div>
  </form>
</section>
`;



export function registerView(ctx) {
    render(registerTemp(createSubmitHandler(onRegister)));
}

async function onRegister({ email, password, 'confirm-password': repass }) {
  if (!email || !password) {
      return alert('All fields are required!')
  }
console.log(password);
console.log(repass);
  if (repass !== password) {
      return alert ('Passwords don\'t match!')
  }

  await register(email, password);
  updateNav();
  page.redirect('/');
}