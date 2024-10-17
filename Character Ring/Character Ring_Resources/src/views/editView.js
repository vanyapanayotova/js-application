
import { getAllItems, getItemById, updateItem } from "../data/solution.js";
import { register } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, updateNav } from "../utils.js";

const editTemp = (item, submitHandler) => html`

  <!-- Edit Page (Only for logged-in users) -->
  <section id="edit">
    <div class="form">
      <img class="border" src="./images/border.png" alt="">
      <h2>Edit Character</h2>
      <form  @submit=${submitHandler} class="edit-form">
        <input
        type="text"
        name="category"
        .value=${item.category}
        id="category"
        placeholder="Character Type"
      />
      <input
        type="text"
        name="image-url"
        .value=${item.imageUrl}
        id="image-url"
        placeholder="Image URL"
      />
      <textarea
      id="description"
      name="description"
      .value=${item.description}
      placeholder="Description"
      rows="2"
      cols="10"
    ></textarea>
    <textarea
      id="additional-info"
      name="additional-info"
      .value=${item.moreInfo}
      placeholder="Additional Info"
      rows="2"
      cols="10"
    ></textarea>
        <button type="submit">Edit</button>
      </form>
      <img class="border" src="./images/border.png" alt="">
    </div>
  </section>
`;


export async function editView(ctx) {
  const id = ctx.params.id;
  console.log(id);

  const edit = await getItemById(id);
  console.log(edit);
  render(editTemp(edit, createSubmitHandler(onEdit)));

  async function onEdit({
    category,
    'image-url': imageUrl, 
    description, 
    'additional-info': moreInfo
  }) {

    if (!category || !imageUrl || !description || !moreInfo) {
      return alert('All fields are required!');
    }

    await updateItem(id, {
      category,
      imageUrl, 
      description, 
      moreInfo
    } 
    );
    
    page.redirect('/item/' + id);
  }

}

