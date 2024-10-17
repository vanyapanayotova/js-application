
import { register } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, updateNav } from "../utils.js";

const registerTemp = (submitHandler) => html`

<!-- Register Page (Only for Guest users) -->
<section id="register">
  <div class="form">
    <h2>Register</h2>
    <form @submit=${submitHandler} class="register-form">
      <input
        type="text"
        name="email"
        id="register-email"
        placeholder="email"
      />
      <input
        type="password"
        name="password"
        id="register-password"
        placeholder="password"
      />
      <input
        type="password"
        name="re-password"
        id="repeat-password"
        placeholder="repeat password"
      />
      <button type="submit">register</button>
      <p class="message">Already registered? <a href="#">Login</a></p>
    </form>
  </div>
</section>`;



export function registerView(ctx) {
    render(registerTemp(createSubmitHandler(onRegister)));
}

async function onRegister({ email, password, 're-password': repass }) {
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