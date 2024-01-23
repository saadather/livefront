import React, { useState, useEffect } from 'react';

function Articles({ category }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch articles based on the category from the API
    fetch(`https://api.nytimes.com/svc/mostpopular/v2/${category}/7.json?api-key=1eHFZtK4jQRIkZeIoIw4ki2agUueFSV8`)
      .then(response => response.json())
      .then(data => setArticles(data.results))
      .catch(error => console.error('Error fetching articles:', error));
  }, [category]);
  
  return (
    <div className="container">
      <h2 className="heading">{category} Articles</h2>
      <div className="card-container">
        {articles.map(article => (
          <div key={article.id} className="card">
            
            <div className="card-content">
              <h3 className="card-title">{article.title}</h3>
              <p className="card-abstract">{article.abstract}</p>
              <p className="card-info">Published Date: {article.published_date}</p>
              <p className="card-info">Section: {article.section}</p>
              <a href={article.url} className="read-more" target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Articles;
