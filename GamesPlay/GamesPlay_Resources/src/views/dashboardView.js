
import { getAllItems } from "../data/solution.js";
import { register } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, updateNav } from "../utils.js";

const dashboardTemp = (items) => html`

  <!-- Catalogue -->
<section id="catalog-page">
  <h1>All Games</h1>
  ${items.map((x) => html`
  <!-- Display div: with information about every game (if any) -->
  <div class="allGames">
      <div class="allGames-info">
          <img src=${x.imageUrl}>
          <h6>${x.category}</h6>
          <h2>${x.title}</h2>
          <a href="/item/${x._id}" class="details-button">Details</a>
      </div>
  </div>`)
  }

  <!-- Display paragraph: If there is no games  -->
  ${items.length === 0 ? html`<h3 class="no-articles">No articles yet</h3>` : ""}
</section>
`;

export async function dashboardView() {
  const items = await getAllItems();

  console.log(items);
  render(dashboardTemp(items));
}