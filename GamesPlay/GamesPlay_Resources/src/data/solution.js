import { get, post, put, del } from "./api.js";

//TODO change according to tast
const endpoints = {
    'catalog': '/data/games?sortBy=_createdOn%20desc',
    'itemById': '/data/games/',
    'items': '/data/games',
    'home': '/data/games?sortBy=_createdOn%20desc&distinct=category',
    'commentPost': '/data/comments'
    
}

export async function createComment(comment) {
    return post(endpoints.commentPost, comment);
}

export async function getComments(id) {
    console.log(id);
    
    return get(`/data/comments?where=gameId%3D%22${id}%22`);
}

export async function getHomeItems() {
    return get(endpoints.home);
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