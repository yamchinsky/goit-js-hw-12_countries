import config from '../../config.json';

export default function fetchCountries(searchQuery) {
  return fetch(`${config.url}/name/${searchQuery}`)
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
}
