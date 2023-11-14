import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

Notiflix.Notify.init({
  position: 'center-center',
});
loader.style.display = 'none';
error.style.display = 'none';
catInfo.style.display = 'none';

function catsSelect(breeds) {
  breedSelect.innerHTML = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
}

fetchBreeds()
  .then(breeds => {
    catsSelect(breeds);
    new SlimSelect({
      select: '#single',
    });
  })
  .catch(err => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page or select another cat breed!'
    );
    throw err;
  });

function displayCatInfo(catData) {
  catInfo.innerHTML = '';

  catData.map(cat => {
    const catImage = document.createElement('img');
    catImage.src = cat.url;
    catImage.style.width = '1000px';

    const catDescription = document.createElement('p');
    catDescription.textContent = `${cat.breeds[0].description}`;
    const catTemperament = document.createElement('p');
    catTemperament.textContent = `Temperament: ${cat.breeds[0].description}`;

    catInfo.appendChild(catImage);
    catInfo.appendChild(catDescription);
    catInfo.appendChild(catTemperament);
    catInfo.style.display = 'block';
  });
}

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  loader.style.display = 'block';

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      displayCatInfo(catData);
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});
