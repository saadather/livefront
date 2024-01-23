import React, { useState, useEffect } from 'react';

function Articles({ category }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.nytimes.com/svc/mostpopular/v2/${category}/7.json?api-key=1eHFZtK4jQRIkZeIoIw4ki2agUueFSV8`);
        const data = await response.json();
        setArticles(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (articles.length === 0) {
    return <div>No articles found.</div>;
  }
  
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
