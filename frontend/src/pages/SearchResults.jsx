import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ArticleCard from '../components/articles/ArticleCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      try {
        if (query) {
          const res = await api.get(`/articles/search?query=${encodeURIComponent(query)}`);
          setArticles(res.data.data);
        } else {
          setArticles([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSearch();
  }, [query]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Search Results</h1>
        <p className="text-slate-500 mt-1 dark:text-slate-400">
          {query ? `Showing results for "${query}"` : 'Please enter a search term'}
        </p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.map(article => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-slate-500 dark:text-slate-400">
          No articles found matching your search.
        </div>
      )}
    </div>
  );
};

export default SearchResults;
