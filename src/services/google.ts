import axios from 'axios';

const baseURL = 'https://www.googleapis.com/books/v1/volumes';

export async function googleBookSearch(searchText: string, startIndex: number = 0, maxResults: number = 10) {
  // const searchTerms = {
  //   searchText, startIndex, maxResults,
  //   orderBy: 'newest',
  // };
  const reqURL = baseURL + `?q=${searchText}&startIndex=${startIndex}&${maxResults}`;
  const { data } = await axios.get(reqURL);

  return data;
}

export async function singleBookSearch(bookID: string) {
  const { data } = await axios.get(baseURL + `/${bookID}`);

  if (data) {
    return data;
  } else {
    console.log('could not find book with ID: ', bookID);
  }
}