
import { html, render } from "../lib.js";
import { createSubmitHandler } from "../utils.js";

const homeTemp = (submitHandler) => html`
 <!-- Home page -->
<section id="hero">
  <h1>
    Accelerate Your Passion Unleash the Thrill of Sport Cars Together!
  </h1>
</section>`;

export function homeView(ctx) {
    render(homeTemp());
}
