import { useState, useEffect } from 'react';

function Shelf() {
  // const [books, setBooks] = useState([]);

  

  return (
    <div className="shelf">
      <Book title="Infinite Jest" author="David Foster Wallace" />
      <Book title="Pachinko" author="Min Jin Lee" />
    </div>
  )
}

function Book({title, author}) {

  return (
    <div className="book">
      <h1 className="title">{title}</h1>
      <h2 className="author">{author}</h2>
    </div>
  )
}

function Home() {
  

  return (
    <div className="Homepage">
      <Shelf />
    </div>
  )
}

export default Home;