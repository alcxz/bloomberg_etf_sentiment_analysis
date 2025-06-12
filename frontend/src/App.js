import { useState } from 'react';
import "./App.css"

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = async () => {
    setLoading(true);
    setError(null);
    
    try {
    const response = await fetch('https://bloomberg-etf-sentiment-analysis.onrender.com/api/sentiments', {method: 'GET'});
    //   const response = await fetch('http://localhost:5000/api/sentiments', {method: 'GET'});
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Error getting response from backend:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment) => {
    if (sentiment >= 0.5) return '#4ade80'; 
    if (sentiment >= 0.05) return '#60a5fa';
    if (sentiment >= -0.05) return '#9ca3af'; 
    if (sentiment >= -0.5) return '#fbbf24'; 
    return '#f87171'; 
  };

  const getSentimentLabel = (sentiment) => {
    if (sentiment >= 0.5) return 'Very Positive';
    if (sentiment >= 0.05) return 'Positive';
    if (sentiment >= -0.05) return 'Neutral';
    if (sentiment >= -0.5) return 'Negative';
    return 'Very Negative';
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="header">ETF Sentiment Analysis</h1>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <button
            onClick={apiCall}
            disabled={loading}
            className="btn"
          >
            {loading ? 'Loading...' : 'Analyze Headlines'}
          </button>
        </div>

        {error && <div className="error">Error: {error}</div>}

        {results.length > 0 && (
          <div className="results">
            <h2>Analysis Results</h2>
            <div className="result-list">
              {results.map((item, idx) => (
                <div key={idx} className="result-item">
                  <div className="headline-row">
                    <h3 className="headline-text">{item.headline}</h3>
                    <span
                      className="label"
                      style={{
                        backgroundColor: getSentimentColor(item.sentiment) + '20',
                        color: getSentimentColor(item.sentiment)
                      }}
                    >
                      {getSentimentLabel(item.sentiment)}
                    </span>
                  </div>
                  <div className="info-row">
                    <span>Date: {item.date}</span>
                    <br/>
                    <span>Score: {item.sentiment.toFixed(3)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && !loading && !error && (
          <div className="placeholder">
            Click "Analyze Headlines" to fetch and analyze ETF news
          </div>
        )}
      </div>
    </div>
  );
}

export default App;