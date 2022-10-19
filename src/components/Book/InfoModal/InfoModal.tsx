import './InfoModal.css';

import Stack from '@mui/material/Stack';

export default function InfoModal({ volumeInfo, isModal }) {
  const { title, subtitle, authors, averageRating, pageCount } = volumeInfo;

  return (
    <Stack className={isModal ? "book-info modal" : "book-info"}>
      <span><strong>Title:</strong> {subtitle ? `${title}, ${subtitle}` : title}</span>
      <span><strong>Author(s):</strong> {authors ? authors.join(', ') : 'N/A'}</span>
      <span><strong>Pages:</strong> {pageCount ? pageCount : 'N/A'}</span>
      <span><strong>Avg. Rating:</strong> {averageRating ? `${averageRating}/5` : 'N/A'}</span>
    </Stack>
  )
}