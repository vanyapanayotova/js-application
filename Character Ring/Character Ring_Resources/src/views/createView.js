
import { createItem, getAllItems, getItemById, updateItem } from "../data/solution.js";
import { register } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, updateNav } from "../utils.js";

const createTemp = (submitHandler) => html`
    <!-- Create Page (Only for logged-in users) -->
    <section id="create">
    <div class="form">
      <img class="border" src="./images/border.png" alt="">
      <h2>Add Character</h2>
      <form @submit=${submitHandler} class="create-form">
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Character Type"
        />
        <input
          type="text"
          name="image-url"
          id="image-url"
          placeholder="Image URL"
        />
        <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="2"
        cols="10"
      ></textarea>
      <textarea
        id="additional-info"
        name="additional-info"
        placeholder="Additional Info"
        rows="2"
        cols="10"
      ></textarea>
        <button type="submit">Add Character</button>
      </form>
      <img class="border" src="./images/border.png" alt="">
    </div>
  </section>
  
`;


export async function createView(ctx) {
  render(createTemp(createSubmitHandler(onCreate)));

  async function onCreate({
    category,
    'image-url': imageUrl, 
    description, 
    'additional-info': moreInfo
  }) {

    if (!category || !imageUrl || !description || !moreInfo) {
      return alert('All fields are required!');
    }

    await createItem({
      category,
      imageUrl, 
      description, 
      moreInfo
    });
    
    page.redirect('/dashboard');
  }

}

