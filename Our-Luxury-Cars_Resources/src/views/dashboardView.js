
import { getAllItems } from "../data/solution.js";
import { register } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, updateNav } from "../utils.js";

const dashboardTemp = (items) => html`

<!-- Dashboard page -->
<h3 class="heading">Our Cars</h3>
<section id="dashboard">
  
  <!-- Display a div with information about every post (if any)-->
   ${items.map((x) => html`
  <div class="car">
    <img src=${x.imageUrl} alt="example1" />
    <h3 class="model">${x.model}</h3>
    <div class="specs">
      <p class="price">Price: €${x.price}</p>
      <p class="weight">Weight: ${x.weight}kg</p>
      <p class="top-speed">Top Speed: ${x.speed}kph</p>
    </div>
    <a class="details-btn" href="/item/${x._id}">More Info</a>
  </div>`)
  }
  
</section>
<!-- Display an h2 if there are no posts -->
  ${items.length === 0 ? html`<h3 class="nothing">Nothing to see yet</h3>` : ""}
`;


export async function dashboardView() {
  const items = await getAllItems();

  console.log(items);
  render(dashboardTemp(items));
}