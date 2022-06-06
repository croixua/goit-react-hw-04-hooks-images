const API_KEY = '25758429-81b852ff65ae4cd9549e3e09e';
const BASE_URL = 'https://pixabay.com/api/';
const PARAMETRS =
  '&per_page=12&image_type=photo&orientation=horizontal&safesearch=true';

export default function fetchImages(searchQuery, page) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}${PARAMETRS}`;

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.hits.length === 0)
        return Promise.reject(
          new Error(`Нет изображений по запросу ${searchQuery}`)
        );
      return data;
    });
}
