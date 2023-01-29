

const BASE_URL = 'https://swapi.dev/api/'

export const Request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json())
    .then(data => data.results)
}
