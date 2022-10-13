import React from 'react';
import './Book.css'
import { BookProps } from '../types/types';

function Book({ title, author }: BookProps): JSX.Element {

  return (
    <div className="book">
      <h1 className="title">{title}</h1>
      <h2 className="author">{author}</h2>
    </div>
  )
}

export default Book;