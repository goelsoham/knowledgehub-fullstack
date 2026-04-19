import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import ArticleCard from '../components/articles/ArticleCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Category = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryAndArticles = async () => {
      setLoading(true);
      try {
        const catRes = await api.get(`/categories/${id}`);
        setCategory(catRes.data.data);
        
        const artRes = await api.get(`/articles?categoryId=${id}&status=approved`);
        setArticles(artRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryAndArticles();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  
  if (!category) return <div className="py-20 text-center text-slate-500">Category not found.</div>;

  return (
    <div>
      <div className="mb-12 rounded-3xl bg-gradient-to-br from-primary-50 to-white p-10 text-center shadow-sm border border-primary-100 dark:from-dark-800 dark:to-dark-900 dark:border-slate-800">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{category.name}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {category.description || `Browse all articles related to ${category.name}`}
        </p>
      </div>

      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Articles in this category
        </h2>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {articles.length} {articles.length === 1 ? 'article' : 'articles'}
        </span>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.map(article => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-slate-500 dark:text-slate-400 rounded-xl bg-slate-50 border border-slate-100 dark:bg-dark-800 dark:border-slate-800">
          No articles published in this category yet.
        </div>
      )}
    </div>
  );
};

export default Category;
