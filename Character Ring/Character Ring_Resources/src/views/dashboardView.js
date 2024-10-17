
import { getAllItems } from "../data/solution.js";
import { register } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, updateNav } from "../utils.js";

const dashboardTemp = (items) => html`
<!-- Dashboard page -->
<h2>Characters</h2>
  <section id="characters">
    <!-- Display a div with information about every post (if any)-->
    ${items.map((x) => html`
    <div class="character">
    <img src=${x.imageUrl} alt="example1" />
    <div class="hero-info">
      <h3 class="category">${x.category}</h3>
      <p class="description">${x.description}</p>
      <a class="details-btn" href="/item/${x._id}">More Info</a>
      </div>
    </div>`)
  }
      
  </section>
   <!-- Display an h2 if there are no posts -->
  ${items.length === 0 ? html`<h2>No added Heroes yet.</h2>` : ""}`;

export async function dashboardView() {
  const items = await getAllItems();

  console.log(items);
  render(dashboardTemp(items));
}