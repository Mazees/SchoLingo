import OptionButton from "./OptionButton";

const labels = ["A", "B", "C", "D"];

const QuestionCard = ({ question, selectedAnswer, onSelectAnswer }) => {
  if (!question) return null;

  return (
    <div className="w-full bg-white rounded-2xl p-6 sm:p-8 border border-primary/10 shadow-xs space-y-6 text-left">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-tertiary text-primary">
          {question.category.replace("_", " ")}
        </span>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-tertiary text-primary border border-primary/20">
          {question.difficulty.toUpperCase()} &bull; {question.points} Poin
        </span>
      </div>

      {question.passage && (
        <div className="p-4 sm:p-5 rounded-xl bg-tertiary/50 border border-primary/15 text-neutral/90 text-sm sm:text-base leading-relaxed italic">
          <p className="font-semibold not-italic text-xs text-primary uppercase tracking-wider mb-2">
            Reading Passage:
          </p>
          "{question.passage}"
        </div>
      )}

      <h2 className="text-lg sm:text-xl font-bold text-neutral leading-relaxed">
        {question.question}
      </h2>

      <div className="space-y-3 pt-2">
        {question.options.map((option, idx) => (
          <OptionButton
            key={idx}
            label={labels[idx] || String(idx + 1)}
            text={option}
            isSelected={selectedAnswer === idx}
            onClick={() => onSelectAnswer(question.id, idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
