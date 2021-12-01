'use strict';

/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
function fetchData() {
  return fetch('https://pokeapi.co/api/v2/pokemon/').then((res) => res.json());
}

async function fetchAndPopulatePokemons() {
  const selector = document.createElement('select');
  const data = await fetchData();

  data.results.forEach((el) => {
    const option = document.createElement('option');
    option.textContent = el.name;
    selector.appendChild(option);
  });
  document.body.appendChild(selector);
  fetchImage(selector);
}

async function fetchImage(selector) {
  selector.addEventListener('change', async () => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${selector.value}`
      );
      const data = await res.json();
      const element = document.getElementById('pok-img');
      if (element) {
        element.remove();
      }
      const pokImage = document.createElement('img');
      pokImage.setAttribute('id', 'pok-img');
      pokImage.src = data.sprites.front_default;
      pokImage.alt = selector.value;
      document.body.appendChild(pokImage);
    } catch (error) {
      throw new Error(error);
    }
  });
}

function main() {
  const button = document.createElement('button');
  button.textContent = 'click pokemon';
  button.setAttribute('type', 'submit');
  document.body.appendChild(button);
  button.addEventListener('click', fetchAndPopulatePokemons);
}
main();
