import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import ProtectedRoute from './components/routes/ProtectedRoute';
import AdminRoute from './components/routes/AdminRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ArticleList from './pages/ArticleList';
import SingleArticle from './pages/SingleArticle';
import ArticleEditor from './pages/ArticleEditor';
import Profile from './pages/Profile';
import Category from './pages/Category';
import SearchResults from './pages/SearchResults';
import AdminDashboard from './pages/AdminDashboard';
import PendingArticles from './pages/PendingArticles';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="articles" element={<ArticleList />} />
            <Route path="articles/:id" element={<SingleArticle />} />
            <Route path="categories/:id" element={<Category />} />
            <Route path="search" element={<SearchResults />} />
            
            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="articles/new" element={
              <ProtectedRoute>
                <ArticleEditor />
              </ProtectedRoute>
            } />
            <Route path="articles/:id/edit" element={
              <ProtectedRoute>
                <ArticleEditor />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="pending" element={<PendingArticles />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
