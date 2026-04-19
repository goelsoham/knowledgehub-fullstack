const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 px-6 text-center dark:border-slate-700 dark:bg-dark-800">
      {Icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400">
          <Icon className="h-8 w-8" />
        </div>
      )}
      <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mb-6 max-w-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
