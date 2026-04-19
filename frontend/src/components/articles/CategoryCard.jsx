import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link 
      to={`/categories/${category._id}`}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-6 shadow-sm transition-all hover:shadow-md dark:from-dark-800 dark:to-dark-900 border border-slate-200 dark:border-slate-800 hover:border-primary-300 dark:hover:border-primary-700"
    >
      <div className="z-10">
        <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
          {category.name}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
          {category.description || `Explore articles related to ${category.name}.`}
        </p>
      </div>
      <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary-100 opacity-50 blur-2xl group-hover:bg-primary-200 transition-colors duration-500 dark:bg-primary-900/40 dark:group-hover:bg-primary-800/40"></div>
    </Link>
  );
};

export default CategoryCard;
