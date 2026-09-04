const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = "Konfirmasi",
  cancelText = "Batal",
  confirmVariant = "primary", // "primary" | "warning" | "danger" | "accent"
  iconType = "info", // "info" | "warning" | "success"
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const iconStyles = {
    info: {
      container: "bg-primary/10 text-primary",
      icon: (
        <svg className="size-7" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      ),
    },
    warning: {
      container: "bg-amber-100 text-amber-600",
      icon: (
        <svg className="size-7" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      ),
    },
    success: {
      container: "bg-emerald-100 text-emerald-600",
      icon: (
        <svg className="size-7" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ),
    },
  };

  const confirmButtonVariants = {
    primary: "bg-primary hover:opacity-90 text-white shadow-md shadow-primary/20",
    warning: "bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20",
    accent: "bg-accent hover:opacity-90 text-neutral shadow-md shadow-accent/20",
  };

  const selectedIcon = iconStyles[iconType] || iconStyles.info;
  const buttonStyle = confirmButtonVariants[confirmVariant] || confirmButtonVariants.primary;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-zinc-100 text-center space-y-5 animate-scale-in">
        <div
          className={`size-14 mx-auto rounded-full flex items-center justify-center ${selectedIcon.container}`}
        >
          {selectedIcon.icon}
        </div>

        <div>
          <h3 className="text-xl font-bold text-neutral">
            {title}
          </h3>
          <div className="mt-2 text-sm text-neutral/70 leading-relaxed">
            {message}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-1/2 py-3 px-4 rounded-xl font-semibold text-sm bg-zinc-100 hover:bg-zinc-200 text-neutral transition cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`w-full sm:w-1/2 py-3 px-4 rounded-xl font-bold text-sm transition cursor-pointer ${buttonStyle}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
