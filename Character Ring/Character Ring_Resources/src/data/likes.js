import { get, post } from './api.js';
import { getUserData } from '../utils.js';

const endpoints = {
    like: '/data/useful',
    likesByItemId: (id) => `/data/useful?where=characterId%3D%22${id}%22&distinct=_ownerId&count`,
    likesByUserId: (id, userId) => `/data/useful?where=characterId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function likeItem(itemId) {
    return await post(endpoints.like, { characterId: itemId }); //TODO: make sure to change object key name
}

export async function getLikesByItemId(itemId) {
    const userData = getUserData();

    const requests = [
        get(endpoints.likesByItemId(itemId))
    ];

    if (userData) {
        requests.push(get(endpoints.likesByUserId(itemId, userData._id)));
    }

    const [likes, hasLiked] = await Promise.all(requests);

    return {
        likes,
        hasLiked: Boolean(hasLiked)
    }
}