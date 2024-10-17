
import { getLikesByItemId, likeItem } from "../data/likes.js";
import { deleteItem, getAllItems, getItemById } from "../data/solution.js";
import { register } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, getUserData, updateNav } from "../utils.js";

const itemTemp = (item, hasLoggedInUser, isOwner, hasLiked, likes) => html`
    <!-- Details page -->
    <section id="details">
      <div id="details-wrapper">
        <img id="details-img" src=${item.imageUrl} alt="example1" />
      <div>
        <p id="details-category">${item.category}</p>
        <div id="info-wrapper">
          <div id="details-description">
            <p id="description">${item.description}</p>
            <p id ="more-info">${item.moreInfo}</p>
          </div>
        </div>
        <h3>Is This Useful:<span id="likes">${likes}</span></h3>

            <!--Edit and Delete are only for creator-->
          ${hasLoggedInUser ? html`
          <div id="action-buttons">
            ${isOwner ? html`<a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}
            
            <!--Bonus - Only for logged-in users ( not authors )-->
            ${hasLiked ? null : html`<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`}
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
  const likesInfo = await getLikesByItemId(id);
  const isOwner = userData?._id == item._ownerId;
  const likes = likesInfo.likes;
  const hasLiked = likesInfo.hasLiked || isOwner;
  const hasLoggedInUser = Boolean(userData);
  render(itemTemp(item, hasLoggedInUser, isOwner, hasLiked, likes));
}

async function onDelete() {
  let choice = confirm('Are you sure?');

  if (!choice) {
    return;
  }

  await deleteItem(id);
  page.redirect('/dashboard');
}

async function onLike() {
  console.log('on like');
  console.log(id);
  await likeItem(id);
  page.redirect('/item/' + id);
}

