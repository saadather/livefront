// BookReview.js
import React, { useState } from 'react';

const BookCard = ({ book }) => (
  <div className="book-card">
    <h3>{book.book_title}</h3>
    <h4>{book.book_author}</h4>
    <p>{book.publication_dt}</p>
    <p>{book.summary}</p>
  </div>
);

const BookReview = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`https://api.nytimes.com/svc/books/v3/reviews.json?author=${searchQuery}&api-key=1eHFZtK4jQRIkZeIoIw4ki2agUueFSV8`);
      const data = await response.json();

      setReviews(data.results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Book Reviews</h2>
      <div>
        <input
          type="text"
          placeholder="Enter book title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {reviews.length > 0 && (
        <div>
          <h3>Search Results</h3>
          <ul>
            {reviews.map((book) => (
              <BookCard key={book.display_title} book={book} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookReview;
