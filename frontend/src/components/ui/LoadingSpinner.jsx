const LoadingSpinner = () => {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-primary-600 dark:border-slate-700 dark:border-t-primary-500"></div>
    </div>
  );
};

export default LoadingSpinner;
