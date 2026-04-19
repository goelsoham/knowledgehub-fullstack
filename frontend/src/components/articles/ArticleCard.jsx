import { Link } from 'react-router-dom';
import { Clock, Eye, ThumbsUp } from 'lucide-react';

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/articles/${article._id}`} className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-dark-800">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
            {article.categoryId?.name || 'Category'}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 line-clamp-2">
          {article.title}
        </h3>
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
          {article.summary}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
            {article.authorId?.name?.charAt(0) || 'U'}
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate max-w-[100px]">
            {article.authorId?.name || 'Unknown'}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center">
            <Eye className="mr-1 h-3 w-3" />
            {article.views || 0}
          </span>
          <span className="flex items-center">
            <ThumbsUp className="mr-1 h-3 w-3" />
            {article.likes || 0}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
