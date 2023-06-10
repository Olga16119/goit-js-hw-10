const API_KEY = `live_JEDDECEcB3Iw32hjhnhvGjvus0Snj1rRQbdWp2FkukrbyNAebjQTdwCg2ZkLkkBX`;
const BASE_URL = `https://api.thecatapi.com/v1/breeds`;
const URL_IMG_CAT = `https://api.thecatapi.com/v1/images/search`;

// функція, яка робить запит і повертає масив порід
function fetchBreeds() {
  return fetch(`${BASE_URL}?${API_KEY}`)
    .then(responce => {
      if (!responce.ok) {
        throw new Error(responce.status);
      }
      return responce.json();
    })
    .catch(error => console.log(error));
}

// функція, яка робить запит і повертає данні про одного кота
function fetchCatByBreed(breedId) {
  return fetch(`${URL_IMG_CAT}?breed_ids=${breedId}&api_key=${API_KEY}`)
    .then(responce => {
      if (!responce.ok) {
        throw new Error(responce.status);
      }
      return responce.json();
    })
    .catch(error => console.log(error));
}

export { fetchBreeds, fetchCatByBreed };
