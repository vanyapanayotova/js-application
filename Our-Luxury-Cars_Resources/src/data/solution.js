import { get, post, put, del } from "./api.js";

//TODO change according to tast
const endpoints = {
    'catalog': '/data/cars?sortBy=_createdOn%20desc',
    'itemById': '/data/cars/',
    'items': '/data/cars',
     searchByName: (query) => `/data/cars?where=model%20LIKE%20%22${query}%22`
}

export async function getAllItems() {
    return get(endpoints.catalog);
}

export async function getItemById(id) {
    return get(endpoints.itemById + id);
}

export async function createItem(item) {
    return post(endpoints.items, item);
}

export async function updateItem(id, data) {
    return put(endpoints.itemById + id, data);
}

export async function deleteItem(id) {
    return del(endpoints.itemById + id);
}

export async function getCarsByName(query) {
    return get(endpoints.searchByName(query));
}