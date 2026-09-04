const ConfirmSubmitModal = ({
  isOpen,
  totalQuestions,
  answeredCount,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const unAnsweredCount = totalQuestions - answeredCount;
  const isComplete = unAnsweredCount === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-zinc-100 text-center space-y-5 animate-scale-in">
        <div
          className={`size-14 mx-auto rounded-full flex items-center justify-center ${
            isComplete ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
          }`}
        >
          {isComplete ? (
            <svg className="size-7" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg className="size-7" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          )}
        </div>

        <div>
          <h3 className="text-xl font-bold text-neutral">
            {isComplete ? "Kumpulkan Jawaban Sekarang?" : "Ada Soal yang Belum Dijawab!"}
          </h3>
          <p className="mt-2 text-sm text-neutral/70 leading-relaxed">
            {isComplete ? (
              <span>
                Anda telah menjawab seluruh <strong className="text-neutral">{totalQuestions} soal</strong>. Hasil tes akan langsung dihitung.
              </span>
            ) : (
              <span>
                Masih ada <strong className="text-red-500">{unAnsweredCount} soal</strong> yang belum dijawab. Apakah Anda yakin ingin menyelesaikan tes sekarang?
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-1/2 py-3 px-4 rounded-xl font-semibold text-sm bg-zinc-100 hover:bg-zinc-200 text-neutral transition cursor-pointer"
          >
            Periksa Lagi
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-1/2 py-3 px-4 rounded-xl font-bold text-sm bg-primary hover:opacity-90 text-white shadow-md transition cursor-pointer"
          >
            Ya, Kumpulkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSubmitModal;
