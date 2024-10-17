
import { createComment, deleteItem, getAllItems, getComments, getItemById } from "../data/solution.js";
import { register } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, getUserData, updateNav } from "../utils.js";

const itemTemp = (item, hasLoggedInUser, isOwner, submitHandler, comments) => html`

  <!--Details Page-->
<section id="game-details">
  <h1>Game Details</h1>
  <div class="info-section">

      <div class="game-header">
          <img class="game-img" src=${item.imageUrl} />
          <h1>${item.title}</h1>
          <span class="levels">MaxLevel: ${item.maxLevel}</span>
          <p class="type">${item.category}</p>
      </div>

      <p class="text">
      ${item.summary}
      </p>

      <!-- Bonus ( for Guests and Users ) -->
      <div class="details-comments">
          <h2>Comments:</h2>
          <ul>
              <!-- list all comments for current game (If any) -->
              ${comments.map((x) => html`
              <li class="comment">
                  <p>Content: ${x.comment}</p>
              </li>`)
  }
          </ul>
          <!-- Display paragraph: If there are no games in the database -->
          ${!comments.length ? html`<p class="no-comment">No comments.</p>` : null}
      </div>

      <!-- Edit/Delete buttons ( Only for creator of this game )  -->
      <div class="buttons">
          ${isOwner ? html`<a href="/edit/${item._id}" class="button">Edit</a>
          <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>` : null}
      </div>
  </div>

  <!-- Bonus -->
  <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
  ${ !isOwner && hasLoggedInUser ? html`<article class="create-comment">
      <label>Add new comment:</label>
      <form @submit=${submitHandler} class="form">
          <textarea name="comment" placeholder="Comment......" id="comment-text"></textarea>
          <input class="btn submit" type="submit" value="Add Comment">
      </form>
  </article>`: null}

</section>
`;

let id = null;
export async function itemView(ctx) {
  id = ctx.params.id;
  const userData = getUserData();
  const item = await getItemById(id);
  const isOwner = userData?._id == item._ownerId;
  let comments = await getComments(id);
  console.log(comments);
  const hasLoggedInUser = Boolean(userData);
  let submitHandler = createSubmitHandler(onCreate);
  render(itemTemp(item, hasLoggedInUser, isOwner, submitHandler, comments));


  async function onCreate({comment}) {
    if (!comment) {
      return alert('comment is required!');
    }

    await createComment({
      gameId: id,
      comment
    });
    console.log('comment');
    let commentEl = document.getElementById('comment-text');
    commentEl.value = '';
    page.redirect("/item/" + id);
  }
}

async function onDelete() {
  let choice = confirm('Are you sure?');

  if (!choice) {
    return;
  }

  await deleteItem(id);
  page.redirect('/dashboard');
}

