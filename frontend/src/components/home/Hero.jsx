import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/common/SearchBar';
import api from '../../services/api';

const Hero = () => {
  const { user } = useAuth();
  
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 py-16 sm:py-24 lg:py-32 mb-12">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
      
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Discover. Share. <span className="text-primary-400">Empower.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-300">
          KnowledgeHub is your central repository for high-quality, community-curated articles on technology, science, and the world around us.
        </p>
        
        <div className="mx-auto mt-10 max-w-xl">
          <SearchBar />
        </div>
        
        {!user && (
          <div className="mt-10 flex justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="px-8">Start Writing</Button>
            </Link>
            <Link to="/articles">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 dark:border-white dark:text-white dark:hover:bg-white/10">
                Explore Articles
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
