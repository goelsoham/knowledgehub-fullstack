import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Hero from '../components/home/Hero';
import ArticleCard from '../components/articles/ArticleCard';
import FeaturedArticleCard from '../components/articles/FeaturedArticleCard';
import CategoryCard from '../components/articles/CategoryCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import { BookOpen } from 'lucide-react';

const Home = () => {
  const [featured, setFeatured] = useState(null);
  const [trending, setTrending] = useState([]);
  const [recent, setRecent] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, trendingRes, categoriesRes] = await Promise.all([
          api.get('/articles?status=approved&limit=7'),
          api.get('/articles/trending'),
          api.get('/categories')
        ]);
        
        const articles = articlesRes.data.data;
        if (articles.length > 0) {
          setFeatured(articles[0]);
          setRecent(articles.slice(1));
        }
        
        setTrending(trendingRes.data.data.slice(0, 3));
        setCategories(categoriesRes.data.data.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-16 pb-12">
      <Hero />
      
      {featured && (
        <section>
          <FeaturedArticleCard article={featured} />
        </section>
      )}

      {trending.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Trending Now</h2>
            <Link to="/articles" className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map(article => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </section>
      )}

      {categories.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Explore Categories</h2>
            <Link to="/categories" className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
              All categories &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(category => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recently Added</h2>
          <Link to="/articles" className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
            View all &rarr;
          </Link>
        </div>
        
        {recent.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map(article => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={BookOpen}
            title="No recent articles"
            description="Check back later for new content from our authors."
          />
        )}
      </section>
    </div>
  );
};

export default Home;
