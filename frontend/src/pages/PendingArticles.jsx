import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';

const PendingArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await api.get('/articles?status=pending');
      setArticles(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      await api.put(`/admin/articles/${id}/${action}`);
      setArticles(articles.filter(a => a._id !== id));
    } catch (err) {
      alert(`Failed to ${action} article`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">Pending Approvals</h1>
      
      {articles.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-dark-900">
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {articles.map((article) => (
              <li key={article._id} className="flex flex-col p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    By {article.authorId?.name || 'Unknown'} in {article.categoryId?.name || 'Unknown'}
                  </p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                    {article.summary}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Link to={`/articles/${article._id}`}>
                    <Button variant="outline" size="sm">Review</Button>
                  </Link>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700 focus:ring-green-500"
                    onClick={() => handleAction(article._id, 'approve')}
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleAction(article._id, 'reject')}
                  >
                    Reject
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="py-20 text-center text-slate-500 dark:text-slate-400 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          No articles waiting for approval.
        </div>
      )}
    </div>
  );
};

export default PendingArticles;
