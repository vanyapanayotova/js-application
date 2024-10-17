
import { getAllItems, getItemById, updateItem } from "../data/solution.js";
import { register } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, updateNav } from "../utils.js";

const editTemp = (item, submitHandler) => html`

  <!-- Edit Page (Only for logged-in users) -->
<section id="edit">
  <div class="form form-auto">
    <h2>Edit Your Car</h2>
    <form @submit=${submitHandler} class="edit-form">
      <input type="text" name="model"
      .value=${item.model} 
      id="model" placeholder="Model" 
      />
      <input
        type="text"
        name="imageUrl"
        .value=${item.imageUrl}
        id="car-image"
        placeholder="Your Car Image URL"
      />
      <input
        type="text"
        name="price"
        .value=${item.price}
        id="price"
        placeholder="Price in Euro"
      />
      <input
        type="number"
        name="weight"
        .value=${item.weight}
        id="weight"
        placeholder="Weight in Kg"
      />
      <input
        type="text"
        name="speed"
        .value=${item.speed}
        id="speed"
        placeholder="Top Speed in Kmh"
      />
      <textarea
        id="about"
        name="about"
        .value=${item.about}
        placeholder="More About The Car"
        rows="10"
        cols="50"
      ></textarea>
      <button type="submit">Edit</button>
    </form>
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
    model,
    imageUrl, 
    price, 
    weight,
    speed,
    about
  }) {

    if (!model || !imageUrl || !price || !weight || !speed || !about) {
      return alert('All fields are required!');
    }

    await updateItem(id, {
      model,
      imageUrl, 
      price, 
      weight,
      speed,
      about
    });

    page.redirect('/item/' + id);
  }

}

