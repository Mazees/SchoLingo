const ProgressBar = ({ answered = 0, total }) => {
  const percentage = total > 0 ? Math.round((answered / total) * 100) : 0;

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-neutral">
        <span>
          Terjawab <span className="text-primary font-bold">{answered}</span> dari {total}
        </span>
        <span className="text-primary">{percentage}% Selesai</span>
      </div>
      <div className="w-full h-2.5 bg-tertiary rounded-full overflow-hidden border border-primary/10">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
