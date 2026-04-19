import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-extrabold text-slate-200 dark:text-slate-800">404</h1>
      <h2 className="mt-8 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        Page not found
      </h2>
      <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className="mt-10 flex gap-4">
        <Link to="/">
          <Button>Go back home</Button>
        </Link>
        <Link to="/articles">
          <Button variant="outline">Browse articles</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
