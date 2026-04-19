import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, FolderOpen, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

const Sidebar = () => {
  const navItems = [
    { name: 'Overview', to: '/admin', icon: LayoutDashboard },
    { name: 'Pending Articles', to: '/admin/pending', icon: FileText },
    { name: 'Users', to: '/admin/users', icon: Users },
    { name: 'Categories', to: '/admin/categories', icon: FolderOpen },
    { name: 'Settings', to: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] w-64 flex-col overflow-y-auto border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-dark-900 sticky top-16 hidden md:flex">
      <div className="flex flex-col gap-1 p-4">
        <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Admin Menu
        </h2>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            end={item.to === '/admin'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-100'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
