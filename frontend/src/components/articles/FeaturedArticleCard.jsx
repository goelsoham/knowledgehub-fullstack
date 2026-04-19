import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Eye } from 'lucide-react';

const FeaturedArticleCard = ({ article }) => {
  if (!article) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-slate-900/90 mix-blend-multiply"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row h-full">
        <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
          <div className="mb-4 flex items-center gap-4 text-primary-200 text-sm font-medium">
            <span className="rounded-full bg-primary-500/20 px-3 py-1 ring-1 ring-primary-500/50">
              Featured
            </span>
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl leading-tight">
            {article.title}
          </h2>
          
          <p className="mb-8 max-w-2xl text-lg text-slate-300 line-clamp-3">
            {article.summary}
          </p>
          
          <div className="mt-auto flex items-center gap-4">
            <Link 
              to={`/articles/${article._id}`}
              className="inline-flex items-center justify-center rounded-lg bg-primary-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Read Full Article
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticleCard;
