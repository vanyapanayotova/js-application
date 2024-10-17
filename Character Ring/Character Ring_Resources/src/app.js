import { page } from "./lib.js";

// TODO remove this import.
import { homeView } from "./views/homeView.js";
// TODO remove this API.test.
import * as api from './data/api.js';
import * as userApi from './data/user.js';
import { loginView } from "./views/loginView.js";
import { logout } from "./data/user.js";
import { updateNav } from "./utils.js";
import { registerView } from "./views/registerView.js";
import { dashboardView } from "./views/dashboardView.js";
import { itemView } from "./views/itemView.js";
import { editView } from "./views/editView.js";
import { createView } from "./views/createView.js";


window.api = api;
window.userApi = userApi;

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/dashboard', dashboardView);
page('/item/:id', itemView);
page('/edit/:id', editView);
page('/create', createView);

page.start();
updateNav();

document.getElementById('logoutLink').addEventListener('click', () => {
    logout();
    updateNav();
    page.redirect('/');
});