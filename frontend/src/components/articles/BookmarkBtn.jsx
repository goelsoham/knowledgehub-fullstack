import { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

const BookmarkBtn = ({ articleId, initialBookmarked = false, className }) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkStatus = async () => {
      if (!user) return;
      try {
        const res = await api.get('/bookmarks');
        const bookmarks = res.data.data;
        const found = bookmarks.some(b => b.articleId?._id === articleId || b.articleId === articleId);
        setIsBookmarked(found);
      } catch (err) {
        console.error(err);
      }
    };
    checkStatus();
  }, [articleId, user]);

  const toggleBookmark = async () => {
    if (!user || isLoading) return;
    setIsLoading(true);
    try {
      if (isBookmarked) {
        const res = await api.get('/bookmarks');
        const bookmarks = res.data.data;
        const bookmark = bookmarks.find(b => b.articleId?._id === articleId || b.articleId === articleId);
        if (bookmark) {
          await api.delete(`/bookmarks/${bookmark._id}`);
          setIsBookmarked(false);
        }
      } else {
        await api.post('/bookmarks', { articleId });
        setIsBookmarked(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <button
      onClick={toggleBookmark}
      disabled={isLoading}
      className={`rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 ${
        isBookmarked 
          ? 'text-primary-600 bg-primary-50 hover:bg-primary-100 dark:text-primary-400 dark:bg-primary-900/30 dark:hover:bg-primary-900/50' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300'
      } ${className || ''}`}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? <BookmarkCheck className="h-5 w-5 fill-current" /> : <Bookmark className="h-5 w-5" />}
    </button>
  );
};

export default BookmarkBtn;
