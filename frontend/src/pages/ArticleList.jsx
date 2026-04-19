import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ArticleCard from '../components/articles/ArticleCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('approved');
  const [sort, setSort] = useState('latest'); // latest, views, likes

  useEffect(() => {
    fetchArticles();
  }, [page, sort]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      let url = `/articles?status=${status}&limit=12&skip=${(page - 1) * 12}`;
      
      if (sort === 'views') {
        url = '/articles/trending';
      }
      
      const res = await api.get(url);
      setArticles(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">All Articles</h1>
          <p className="text-slate-500 mt-1 dark:text-slate-400">Discover knowledge across all domains.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-dark-800 dark:text-slate-200"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="views">Most Viewed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : articles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map(article => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
          <div className="mt-12 flex justify-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setPage(p => p + 1)}
              disabled={articles.length < 12}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <div className="py-20 text-center text-slate-500 dark:text-slate-400">
          No articles found.
        </div>
      )}
    </div>
  );
};

export default ArticleList;
