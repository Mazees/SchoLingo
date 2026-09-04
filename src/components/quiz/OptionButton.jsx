const OptionButton = ({ label, text, isSelected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
        isSelected
          ? "bg-primary/10 border-primary ring-2 ring-primary/20 text-neutral shadow-xs"
          : "bg-white border-primary/15 hover:border-primary hover:bg-tertiary/40 text-neutral/90"
      }`}
    >
      <span
        className={`flex-shrink-0 size-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
          isSelected
            ? "bg-primary text-white"
            : "bg-tertiary text-primary group-hover:bg-primary group-hover:text-white"
        }`}
      >
        {label}
      </span>
      <span className="pt-1 text-sm sm:text-base leading-relaxed font-medium">
        {text}
      </span>
    </button>
  );
};

export default OptionButton;
