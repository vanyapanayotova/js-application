
import { getLikesByItemId, likeItem } from "../data/likes.js";
import { deleteItem, getAllItems, getItemById } from "../data/solution.js";
import { register } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, getUserData, updateNav } from "../utils.js";

const itemTemp = (item, hasLoggedInUser, isOwner) => html`

  <!-- Details page -->

<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${item.imageUrl} alt="example1" />
    <p id="details-title">${item.model}</p>
    <div id="info-wrapper">
      <div id="details-description">
        <p class="price">Price: €${item.price}</p>
        <p class="weight">Weight: ${item.weight} kg</p>
        <p class="top-speed">Top Speed: ${item.speed} kph</p>
        <p id="car-description">${item.about}
        </p>
      </div>

      <!--Edit and Delete are only for creator-->
      ${hasLoggedInUser ? html`
        <div id="action-buttons">
          ${isOwner ? html`<a href="/edit/${item._id}" id="edit-btn">Edit</a>
          <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}
          
        </div>` : null}
    </div>
  </div>
</section>


`;

let id = null;
export async function itemView(ctx) {
  id = ctx.params.id;
  const userData = getUserData();
  const item = await getItemById(id);

  console.log(item);
  const isOwner = userData?._id == item._ownerId;
  const hasLoggedInUser = Boolean(userData);
  render(itemTemp(item, hasLoggedInUser, isOwner));
}

async function onDelete() {
  let choice = confirm('Are you sure?');

  if (!choice) {
    return;
  }

  await deleteItem(id);
  page.redirect('/dashboard');
}


