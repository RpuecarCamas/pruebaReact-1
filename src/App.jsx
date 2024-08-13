import React, { useState, useEffect } from 'react';
import ResultsTable from './components/ResultsTable';
import { fetchToken, fetchResults } from './service/fetch.js';
import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      await fetchToken();
      loadResults();
    };

    initialize();
  }, []);

  const loadResults = async () => {
    setLoading(true);
    const newResults = await fetchResults(page);
    if (newResults.length === 0) {
      setHasMore(false);
    } else {
      setResults(prevResults => [...prevResults, ...newResults]);
      setPage(prevPage => prevPage + 1);
    }
    setLoading(false);
  };

  return (
    <>
      <main>
        <h1>Prueba React 1</h1>
        <ResultsTable
          results={results}
          loadMore={loadResults}
          hasMore={hasMore}
        />
        {loading && <h4>Loading...</h4>}
      </main>
      <footer>
        <p>Author: Raquel Puerto &copy; {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}

export default App;
