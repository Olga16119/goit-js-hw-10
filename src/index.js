// імпорт сервісних функцій
import { fetchBreeds, fetchCatByBreed } from './cat-api';

// отримання посилання на елементи
const select = document.querySelector(`.breed-select`);
const loader = document.querySelector(`.loader`);
const error = document.querySelector(`.error`);
const infoByCat = document.querySelector(`.cat-info`);

// додаємо обробника подій на селект
select.addEventListener(`change`, onSelectChange);

// функція-callback для обробника подій
function onSelectChange() {
  const selectedOption = select.value;
  if (selectedOption) {
    loadingElements(true);
    clearInfoByCat();

    fetchCatByBreed(selectedOption)
      .then(data => {
        const dataCat = data[0];
        const breed = dataCat.breeds[0];
        const infoByCat = {
          name: breed.name,
          description: breed.description,
          temperament: breed.temperament,
          image: dataCat.url,
        };
        return infoByCat;
      })
      .then(dataByCat => {
        renderInfoByCat(dataByCat);
        loadingElements(false)
      })
      .catch(error => {
        console.log(error)
        showError()
        loadingElements(false)
      });
  }
  else {
    clearInfoByCat();
  }
}

  // створюємо option і додаємо значення
  function renderSelectOption(breeds) {
    breeds.forEach(breed => {
      const option = document.createElement(`option`);
      option.value = breed.id;
      option.textContent = breed.name;
      select.appendChild(option);
    });
  }

  // функція, яка рендерить розмітку для інформаціі про кота
  function renderInfoByCat(dataByCat) {
    infoByCat.innerHTML = `<img src="${dataByCat.image}" alt="${dataByCat.name}"/><h2><span>Name:</span>${dataByCat.name}</h2><p><span>Description:</span>${dataByCat.description}</p><p><span>Temperament:</span>${dataByCat.temperament}</p>`;
  }
  loadingElements(true)

  fetchBreeds()
    .then(data => data.map(breed => ({ id: breed.id, name: breed.name })))
    .then(breeds => {
      select.style.display = `block`
      renderSelectOption(breeds);
  loadingElements(false);
})
    .catch(error => {
      console.log(error)
      showError();
      loadingElements(false)
    });

function loadingElements(loading) {
  select.disabled = loading;
  infoByCat.style.disabled = loading ? `none` : `block`;
  loader.style.display=loading?`block`:`none`
  }

function showError() {
  error.classList.remove(`unvisible`)
}

function clearInfoByCat() {
  infoByCat.innerHTML=``
}