import { useState, useEffect } from 'react';
import { Users, FileText, FolderOpen, CheckCircle } from 'lucide-react';
import api from '../services/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    articles: 0,
    categories: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, allArtRes, pendArtRes, catRes] = await Promise.all([
          api.get('/admin/users'), // Assuming we have this, else just mock
          api.get('/articles'),
          api.get('/articles?status=pending'),
          api.get('/categories')
        ]);
        
        setStats({
          users: usersRes.data?.data?.length || 0,
          articles: allArtRes.data?.data?.length || 0,
          pending: pendArtRes.data?.data?.length || 0,
          categories: catRes.data?.data?.length || 0
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Users', value: stats.users, icon: Users, color: 'bg-blue-500' },
    { title: 'Total Articles', value: stats.articles, icon: FileText, color: 'bg-indigo-500' },
    { title: 'Pending Approvals', value: stats.pending, icon: CheckCircle, color: 'bg-amber-500' },
    { title: 'Categories', value: stats.categories, icon: FolderOpen, color: 'bg-emerald-500' },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, idx) => (
          <div key={idx} className="flex items-center rounded-2xl bg-white p-6 shadow-sm border border-slate-200 dark:border-slate-800 dark:bg-dark-900">
            <div className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full ${stat.color} text-white`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
