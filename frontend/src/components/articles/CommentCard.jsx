import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const CommentCard = ({ comment, onDelete }) => {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(comment._id);
    setIsDeleting(false);
  };

  const isOwnerOrAdmin = user && (user._id === comment.userId?._id || user.role === 'admin');

  return (
    <div className="flex gap-4 border-b border-slate-100 py-4 last:border-0 dark:border-slate-800">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
        {comment.userId?.name?.charAt(0) || 'U'}
      </div>
      <div className="flex-1">
        <div className="mb-1 flex items-center justify-between">
          <div>
            <span className="font-semibold text-slate-900 dark:text-white">
              {comment.userId?.name || 'Unknown User'}
            </span>
            <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          {isOwnerOrAdmin && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
        <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
          {comment.content}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
