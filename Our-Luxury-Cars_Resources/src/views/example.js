// TODO delete this view.

import { html, render } from "../lib.js";
import { createSubmitHandler } from "../utils.js";

const exampleTemp = (submitHandler) => html`
<h2>Hello, exam!
    <form @submit=${submitHandler}>
        <input name='myData'>
        <input type='submit' value='Submit'>
    </form>
<h2>`;

export function exampleView(ctx) {
    render(exampleTemp(createSubmitHandler(onSubmit)));
}

function onSubmit(data, form) {
    
}