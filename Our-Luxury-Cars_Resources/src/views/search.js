import { getCarsByName } from "../data/solution.js";
import { html, page, render } from "../lib.js";
import { getUserData } from '../utils.js';

const searchTemplate = (onSearch, foundCars, userData) => html`
    <section id="search">
        <div class="form">
        <h4>Search</h4>
        <form class="search-form">
            <input type="text" name="search" id="search-input" />
            <button @click=${onSearch} class="button-list">Search</button>
        </form>
        </div>
        <div class="search-result">

            ${foundCars.length > 0
                ? html`
                    ${foundCars.map((car) => foundCarCard(car))}
                `
                : html`
                    <h2 class="no-avaliable">No result.</h2>
                `
            }

        </div>
    </section>
`;

const foundCarCard = (car) => html`
    <div class="car">
        <img src=${car.imageUrl} alt="example1"/>
        <h3 class="model">${car.model}</h3>
        <a class="details-btn" href="/item/${car._id}">More Info</a>
    </div>
`;

export async function searchView(ctx) {
    console.log('dsdsdsfsdfsdfsdf');
    let foundCars = [];
    const userData = getUserData();

    render(searchTemplate(onSearch, foundCars, userData));

    async function onSearch(e) {
        e.preventDefault();
        const name = document.getElementById('search-input').value;

        if(name == '') {
            return alert('The field is required');
        }

        foundCars = await getCarsByName(name);
        console.log(foundCars);

        render(searchTemplate(onSearch, foundCars, userData));
    }
}

