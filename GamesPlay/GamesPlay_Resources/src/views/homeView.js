// TODO delete this view.

import { getAllItems, getHomeItems } from "../data/solution.js";
import { html, render } from "../lib.js";
import { createSubmitHandler } from "../utils.js";

const homeTemp = (items) => html`
  <!--Home Page-->
<section id="welcome-world">

<div class="welcome-message">
    <h2>ALL new games are</h2>
    <h3>Only in GamesPlay</h3>
</div>
<img src="./images/four_slider_img01.png" alt="hero">

<div id="home-page">
    <h1>Latest Games</h1>

    <!-- Display div: with information about every game (if any) -->
     ${items.map((x) => html`
    <div class="game">
        <div class="image-wrap">
            <img src=${x.imageUrl}>
        </div>
        <h3>${x.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href="/item/${x._id}" class="btn details-btn">Details</a>
        </div>
    </div>`)
  }
    
    <!-- Display paragraph: If there is no games  -->
    ${items.length === 0 ? html`<p class="no-articles">No games yet</p>` : ""}
</div>
</section>`;



export async function homeView(ctx) {
  let items = await getHomeItems();
  console.log(items);
  items = items.slice(0,3);

    render(homeTemp(items));
}
