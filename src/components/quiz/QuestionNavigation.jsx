const QuestionNavigation = ({
  totalQuestions,
  currentIndex,
  answers,
  questions,
  onSelectIndex,
  onPrev,
  onNext,
  onSubmit,
}) => {
  const answeredCount = Object.keys(answers).length;
  const percentage = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
  const isAllAnswered = answeredCount === totalQuestions;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-primary/10 shadow-xs space-y-6">
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-neutral/70 mb-3">
          <span>
            ({answeredCount}/{totalQuestions} Terjawab)
          </span>
          <span className="text-primary font-bold">{percentage}%</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = currentIndex === idx;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectIndex(idx)}
                className={`h-10 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center ${
                  isCurrent
                    ? "bg-tertiary/40 text-primary border-2 border-primary"
                    : isAnswered
                      ? "bg-primary text-white  "
                      : "bg-tertiary/40 text-neutral/60 hover:bg-tertiary border border-transparent"
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`w-full sm:w-1/2 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
            currentIndex === 0
              ? "bg-tertiary/50 text-neutral/30 cursor-not-allowed"
              : "bg-tertiary hover:bg-primary/15 text-primary cursor-pointer"
          }`}
        >
          Sebelumnya
        </button>

        {isLastQuestion ? (
          <button
            type="button"
            onClick={onSubmit}
            className={`w-full sm:w-1/2 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              isAllAnswered
                ? "bg-accent hover:opacity-90 text-neutral shadow-md shadow-accent/20"
                : "bg-primary hover:opacity-90 text-white"
            }`}
          >
            Kumpulkan
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="w-full sm:w-1/2 py-3 px-4 rounded-xl font-bold text-sm bg-primary hover:opacity-90 text-white transition-all cursor-pointer"
          >
            Selanjutnya
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionNavigation;
