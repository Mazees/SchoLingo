import { useState } from "react";
import { useQuiz } from "../hooks/useQuiz";
import ProgressBar from "../components/quiz/ProgressBar";
import QuestionCard from "../components/quiz/QuestionCard";
import QuestionNavigation from "../components/quiz/QuestionNavigation";
import ConfirmModal from "../components/common/ConfirmModal";
import { Link } from "react-router-dom";

const TestPage = () => {
  const {
    questions,
    userSession,
    answers,
    currentQuestionIndex,
    startQuiz,
    selectAnswer,
    prevQuestion,
    nextQuestion,
    goToQuestion,
    finishTest,
    resetQuiz,
    isSubmitted,
  } = useQuiz();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRetestModalOpen, setIsRetestModalOpen] = useState(false);

  const handleStartClick = () => {
    if (isSubmitted) {
      setIsRetestModalOpen(true);
    } else {
      startQuiz();
    }
  };

  if (currentQuestionIndex === -1) {
    return (
      <div className="min-h-screen bg-tertiary/40 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-10 border border-primary/10 shadow-lg text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tertiary text-primary text-xs font-bold uppercase tracking-wider">
            Placement Test Session
          </div>

          <div className="space-y-5">
            <h1 className="text-2xl sm:text-3xl font-black text-neutral">
              Halo, {userSession?.name.split(" ")[0] || "Peserta"}!
            </h1>
            <h2 className="text-2xl sm:text-3xl font-black text-primary italic">
              LET'S START QUIZ NOW!
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral/70">
              Target Program:{" "}
              <strong className="text-primary">
                {userSession?.targetProgram || "English Foundation"}
              </strong>
            </p>
          </div>

          <div className="flex not-sm:flex-col gap-4">
            {isSubmitted && (
              <Link
                to="/result"
                className="w-full py-4 px-6 rounded-2xl bg-accent text-neutral hover:text-accent hover:bg-neutral font-extrabold text-base shadow-lg shadow-primary/20 transition-all cursor-pointer active:scale-98"
              >
                Lihat Riwayat
              </Link>
            )}
            <button
              type="button"
              onClick={handleStartClick}
              className="w-full py-4 px-6 rounded-2xl bg-primary text-white hover:text-primary hover:bg-white border-2 border-transparent hover:border-primary font-extrabold text-base shadow-lg shadow-primary/20 transition-all cursor-pointer active:scale-98"
            >
              {isSubmitted ? "Ulangi Tes" : "Mulai Sekarang"}
            </button>
          </div>

          <div className="pt-2">
            <Link
              to="/"
              className="text-sm text-neutral/70 hover:text-primary transition-colors inline-block"
            >
              &larr; Kembali ke Beranda
            </Link>
          </div>
        </div>

        <ConfirmModal
          isOpen={isRetestModalOpen}
          title="Mulai Ulang Tes?"
          message={
            <span>
              Anda sudah pernah menyelesaikan tes sebelumnya. Memulai tes baru akan mereset riwayat jawaban dan hasil tes Anda.
            </span>
          }
          iconType="warning"
          confirmVariant="danger"
          confirmText="Ya, Mulai Ulang"
          cancelText="Batal"
          onCancel={() => setIsRetestModalOpen(false)}
          onConfirm={() => {
            setIsRetestModalOpen(false);
            resetQuiz();
            startQuiz();
          }}
        />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-tertiary/30 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-primary/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/icon.png" alt="SchoLingo" className="size-8" />
            <div>
              <h1 className="font-bold text-neutral text-sm sm:text-base">
                SchoLingo Placement Test
              </h1>
              <p className="text-xs text-neutral/60">
                Peserta:{" "}
                <span className="font-semibold text-neutral">
                  {userSession?.name}
                </span>
              </p>
            </div>
          </div>

          <div className="w-full sm:w-72">
            <ProgressBar
              answered={answeredCount}
              total={questions.length}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={answers[currentQuestion?.id]}
              onSelectAnswer={selectAnswer}
            />
          </div>

          <div className="lg:col-span-1 sticky top-6">
            <QuestionNavigation
              totalQuestions={questions.length}
              currentIndex={currentQuestionIndex}
              answers={answers}
              questions={questions}
              onSelectIndex={goToQuestion}
              onPrev={prevQuestion}
              onNext={nextQuestion}
              onSubmit={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title={
          answeredCount === questions.length
            ? "Kumpulkan Jawaban Sekarang?"
            : "Ada Soal yang Belum Dijawab!"
        }
        message={
          answeredCount === questions.length ? (
            <span>
              Anda telah menjawab seluruh{" "}
              <strong className="text-neutral">{questions.length} soal</strong>.
              Hasil tes akan langsung dihitung.
            </span>
          ) : (
            <span>
              Masih ada{" "}
              <strong className="text-red-500">
                {questions.length - answeredCount} soal
              </strong>{" "}
              yang belum dijawab. Apakah Anda yakin ingin menyelesaikan tes sekarang?
            </span>
          )
        }
        iconType={answeredCount === questions.length ? "success" : "warning"}
        confirmVariant={answeredCount === questions.length ? "primary" : "warning"}
        confirmText="Ya, Kumpulkan"
        cancelText="Periksa Lagi"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          finishTest();
        }}
      />
    </div>
  );
};

export default TestPage;
