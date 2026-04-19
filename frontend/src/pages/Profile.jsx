import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import ArticleCard from '../components/articles/ArticleCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { BookMarked, User } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await api.get('/bookmarks');
        setBookmarks(res.data.data.filter(b => b.articleId).map(b => b.articleId));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchBookmarks();
    }
  }, [user]);

  if (!user) return null;

  return (
    <div>
      <div className="mb-12 overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200 dark:border-slate-800 dark:bg-dark-900">
        <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-700"></div>
        <div className="px-8 pb-8">
          <div className="-mt-12 mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-slate-100 text-3xl font-bold text-slate-600 dark:border-dark-900 dark:bg-slate-800 dark:text-slate-300">
            {user.name.charAt(0)}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
              <p className="flex items-center text-slate-500 dark:text-slate-400 mt-1">
                <User className="mr-2 h-4 w-4" />
                {user.email} &bull; <span className="ml-1 capitalize">{user.role}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
          <BookMarked className="h-6 w-6 text-primary-600 dark:text-primary-500" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Bookmarks</h2>
        </div>
        
        {loading ? (
          <LoadingSpinner />
        ) : bookmarks.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {bookmarks.map(article => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-500 dark:text-slate-400 rounded-xl bg-slate-50 border border-slate-100 dark:bg-dark-800 dark:border-slate-800">
            You haven't bookmarked any articles yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
