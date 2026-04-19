import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Eye, Edit, Trash2, ShieldAlert } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import BookmarkBtn from '../components/articles/BookmarkBtn';
import LikeBtn from '../components/articles/LikeBtn';
import CommentSection from '../components/articles/CommentSection';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';

const SingleArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/articles/${id}`);
        setArticle(res.data.data);
      } catch (err) {
        setError('Article not found or you do not have permission to view it.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await api.delete(`/articles/${id}`);
        navigate('/articles');
      } catch (err) {
        alert('Failed to delete article');
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  
  if (error || !article) {
    return (
      <div className="py-20 text-center">
        <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Oops!</h2>
        <p className="mb-8 text-slate-600 dark:text-slate-400">{error}</p>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  const isOwner = user?._id === article.authorId?._id;
  const isAdmin = user?.role === 'admin';
  const canEdit = isOwner || isAdmin;

  return (
    <div className="mx-auto max-w-4xl">
      {article.status !== 'approved' && (
        <div className="mb-6 rounded-lg bg-amber-50 p-4 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400">
            <ShieldAlert className="h-5 w-5" />
            <p className="font-medium">
              This article is currently <span className="uppercase">{article.status}</span>.
            </p>
          </div>
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <Link 
          to={`/categories/${article.categoryId?._id}`}
          className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-900/50"
        >
          {article.categoryId?.name || 'Category'}
        </Link>
        
        <div className="flex items-center gap-2">
          {canEdit && (
            <>
              <Link to={`/articles/${article._id}/edit`}>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Button onClick={handleDelete} variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
          <BookmarkBtn articleId={article._id} />
        </div>
      </div>

      <h1 className="mb-6 text-4xl font-extrabold text-slate-900 dark:text-white md:text-5xl leading-tight">
        {article.title}
      </h1>

      <div className="mb-10 flex flex-wrap items-center gap-6 border-b border-slate-200 pb-8 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {article.authorId?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              {article.authorId?.name || 'Unknown Author'}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {article.authorId?.email || ''}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 sm:ml-auto">
          <span className="flex items-center">
            <Clock className="mr-1.5 h-4 w-4" />
            {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="flex items-center">
            <Eye className="mr-1.5 h-4 w-4" />
            {article.views} views
          </span>
        </div>
      </div>

      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
        <div className="mb-8 text-xl font-medium leading-relaxed text-slate-600 dark:text-slate-300">
          {article.summary}
        </div>
        
        <div className="whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200">
          {article.content}
        </div>
      </div>

      {article.tags && article.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2">
          {article.tags.map((tag, idx) => (
            <span key={idx} className="rounded-md bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-dark-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-12 flex justify-between border-t border-slate-200 pt-8 dark:border-slate-800">
        <LikeBtn 
          articleId={article._id} 
          initialLikes={article.likes} 
          initialDislikes={article.dislikes} 
        />
        <div className="text-sm text-slate-500">
          Last updated: {new Date(article.updatedAt).toLocaleDateString()}
        </div>
      </div>

      <CommentSection articleId={article._id} />
    </div>
  );
};

export default SingleArticle;
