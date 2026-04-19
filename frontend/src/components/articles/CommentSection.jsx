import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import CommentCard from './CommentCard';

const CommentSection = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/article/${articleId}`);
      setComments(res.data.data);
    } catch (err) {
      console.error('Failed to fetch comments', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;
    
    setIsSubmitting(true);
    try {
      const res = await api.post('/comments', {
        articleId,
        content: newComment.trim()
      });
      // The API returns the raw comment. We fetch all again to get populated user info
      await fetchComments();
      setNewComment('');
    } catch (err) {
      console.error('Failed to post comment', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err) {
      console.error('Failed to delete comment', err);
    }
  };

  return (
    <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-dark-900">
      <div className="mb-6 flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-primary-600 dark:text-primary-500" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Discussion ({comments.length})
        </h3>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            rows="3"
            placeholder="Share your thoughts..."
            className="mb-3 w-full rounded-xl border border-slate-300 p-4 text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-dark-800 dark:text-white"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <Button type="submit" isLoading={isSubmitting} disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </div>
        </form>
      ) : (
        <div className="mb-8 rounded-xl bg-slate-50 p-6 text-center dark:bg-dark-800">
          <p className="mb-4 text-slate-600 dark:text-slate-400">
            Sign in to join the conversation.
          </p>
          <Link to="/login">
            <Button>Log in</Button>
          </Link>
        </div>
      )}

      {isLoading ? (
        <div className="py-8 text-center text-slate-500 dark:text-slate-400">Loading comments...</div>
      ) : comments.length > 0 ? (
        <div className="space-y-2">
          {comments.map(comment => (
            <CommentCard key={comment._id} comment={comment} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-slate-500 dark:text-slate-400">
          No comments yet. Be the first to share your thoughts!
        </div>
      )}
    </div>
  );
};

export default CommentSection;
