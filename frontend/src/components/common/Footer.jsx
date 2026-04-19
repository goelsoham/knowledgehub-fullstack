import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-dark-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary-600 dark:text-primary-500" />
              <span className="text-xl font-bold text-slate-900 dark:text-white">KnowledgeHub</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              A comprehensive platform for discovering, creating, and sharing knowledge. Empowering communities through accessible information.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300">
                <span className="sr-only">Social</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Platform</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/articles" className="text-base text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                  All Articles
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-base text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-base text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                  Trending
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
          <p className="text-base text-slate-400 xl:text-center">
            &copy; {new Date().getFullYear()} KnowledgeHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
