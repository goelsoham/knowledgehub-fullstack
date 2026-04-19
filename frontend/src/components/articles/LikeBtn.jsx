import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';

const LikeBtn = ({ articleId, initialLikes = 0, initialDislikes = 0, className }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleAction = async (action) => {
    if (!user || isLoading) return;
    setIsLoading(true);
    try {
      const endpoint = action === 'like' ? 'like' : 'dislike';
      const res = await api.put(`/articles/${articleId}/${endpoint}`);
      setLikes(res.data.data.likes);
      setDislikes(res.data.data.dislikes);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex items-center gap-2 rounded-full bg-slate-100 p-1 dark:bg-dark-800", className)}>
      <button
        onClick={() => handleAction('like')}
        disabled={isLoading || !user}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-white hover:text-slate-900 disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
      >
        <ThumbsUp className="h-4 w-4" />
        <span>{likes}</span>
      </button>
      <div className="h-4 w-px bg-slate-300 dark:bg-slate-600"></div>
      <button
        onClick={() => handleAction('dislike')}
        disabled={isLoading || !user}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-white hover:text-slate-900 disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
      >
        <ThumbsDown className="h-4 w-4" />
        <span>{dislikes}</span>
      </button>
    </div>
  );
};

export default LikeBtn;
