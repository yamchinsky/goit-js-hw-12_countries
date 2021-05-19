import './styles.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

import _ from 'lodash';

import tpl from './templates/tpl.hbs';

import fetchCountries from './js/fetchCountries.js';
import getNodes from './js/getnodes.js';
const nodes = getNodes();

nodes.inputBtn.addEventListener(
  'input',
  _.debounce(() => {
    searchCountry();
  }, 500),
);

function searchCountry() {
  fetchCountries(nodes.inputBtn.value)
    .then(countries => {
      if (countries.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
          type: 'info',
        });
      } else if (countries.length > 1) {
        renderCountriesList(countries);
      } else if (countries.length === 1) {
        renderCountryCard(countries[0]);
      }
    })
    .catch(error => console.log(error));
}

function renderCountryCard(country) {
  const markup = tpl(country);
  nodes.cardBtn.innerHTML = markup;
}

function renderCountriesList(countries) {
  let markup = '<ul>';
  for (let country of countries) {
    markup += `<li>${country.name}</li>`;
  }
  markup += '</ul>';
  nodes.cardBtn.innerHTML = markup;
}
