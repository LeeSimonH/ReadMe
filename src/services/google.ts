import axios from 'axios';

const baseURL = 'https://www.googleapis.com/books/v1/volumes';

export async function googleBookSearch(text: string) {
  const { data: { items } } = await axios.get(baseURL + `?q=${text}`);
  // array of objects: [ {...}, {...}, ...]
  const bookResults = items;
  // console.log('GBooks search book results: ', bookResults);

  return bookResults;
}

export async function singleBookSearch(bookID: string) {
  const { data } = await axios.get(baseURL + `/${bookID}`);

  if (data) {
    return data;
  } else {
    console.log('could not find book with ID: ', bookID);
  }
}