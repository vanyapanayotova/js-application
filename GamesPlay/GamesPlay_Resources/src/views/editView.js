
import { getAllItems, getItemById, updateItem } from "../data/solution.js";
import { register } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, updateNav } from "../utils.js";

const editTemp = (item, submitHandler) => html`
  <!-- Edit Page ( Only for the creator )-->
<section id="edit-page" class="auth">
  <form @submit=${submitHandler} id="edit">
      <div class="container">

          <h1>Edit Game</h1>
          <label for="leg-title">Legendary title:</label>
          <input type="text" id="title" name="title" value=${item.title}>

          <label for="category">Category:</label>
          <input type="text" id="category" name="category" value=${item.category}>

          <label for="levels">MaxLevel:</label>
          <input type="number" id="maxLevel" name="maxLevel" min="1" value=${item.maxLevel}>

          <label for="game-img">Image:</label>
          <input type="text" id="imageUrl" name="imageUrl" value=${item.imageUrl}>

          <label for="summary">Summary:</label>
          <textarea name="summary" .value=${item.summary} id="summary"></textarea>
          <input class="btn submit" type="submit" value="Edit Game">

      </div>
  </form>
</section>
`;


export async function editView(ctx) {
  const id = ctx.params.id;
  console.log(id);

  const edit = await getItemById(id);
  console.log(edit);
  render(editTemp(edit, createSubmitHandler(onEdit)));

  async function onEdit({
    title,
    category,
    maxLevel,
    imageUrl,
    summary
  }) {

    if (!title || !category || !maxLevel || !imageUrl || !summary) {
      return alert('All fields are required!');
    }

    await updateItem(id, {
      title,
      category,
      maxLevel,
      imageUrl,
      summary
    });

    page.redirect('/item/' + id);
  }

}

