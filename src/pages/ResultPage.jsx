import { useState } from "react";
import { useQuiz } from "../hooks/useQuiz";
import { generateWhatsAppLink } from "../utils/whatsapp";
import { Link } from "react-router-dom";

const ResultPage = () => {
  const [step, setStep] = useState(1);
  const { userSession, questions, getResult, goToQuestion } = useQuiz();

  const { score, level, correctCount, programsSuggestion } = getResult();

  const waUrl = generateWhatsAppLink({
    phoneNumber: "6281234567890",
    userName: userSession?.name || "Peserta",
    level: level.toUpperCase(),
    score: score,
    programTitle: programsSuggestion?.title || "English Foundation",
  });

  const levelColorMap = {
    beginner: {
      badgeBg: "bg-tertiary text-primary border-primary/30",
      accentBorder: "border-primary/20",
    },
    intermediate: {
      badgeBg: "bg-accent/20 text-neutral border-accent/50",
      accentBorder: "border-accent/40",
    },
    advanced: {
      badgeBg: "bg-primary text-white border-primary",
      accentBorder: "border-primary",
    },
  };

  const currentTheme = levelColorMap[level] || levelColorMap.beginner;

  return (
    <div className="min-h-screen bg-tertiary/40 py-6 sm:py-10 px-3 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">

        {step === 1 && (
          <div className="bg-accent rounded-2xl sm:rounded-3xl p-5 sm:p-10 border-2 border-neutral/20 shadow-xl text-center space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-neutral text-white text-[11px] sm:text-xs font-black uppercase tracking-wider">
              Placement Test Evaluation
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-neutral tracking-tight">
                {`Selamat, ${userSession?.name ? `${userSession.name.split(" ")[0]} ${userSession.name.split(" ")[1] || ""}`.trim() : "Peserta"}!`}
              </h1>
              <p className="text-xs sm:text-base text-neutral/90 font-medium max-w-lg mx-auto leading-relaxed">
                Berikut adalah hasil evaluasi kecakapan bahasa Inggris Anda berdasarkan {questions.length} soal yang telah diselesaikan.
              </p>
            </div>

            <div className="p-4 sm:p-8 rounded-2xl bg-white border-2 border-neutral/15 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center">
              <div className="flex flex-col items-center justify-center p-1 sm:p-2">
                <span className="text-[11px] sm:text-xs font-black text-neutral/70 uppercase tracking-wider">
                  Total Skor
                </span>
                <div className="flex items-baseline gap-1 mt-1 sm:mt-2">
                  <span className="text-4xl sm:text-6xl font-black text-primary">
                    {score}
                  </span>
                  <span className="text-lg sm:text-2xl text-neutral/50 font-bold">
                    /100
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs text-neutral font-black mt-2 bg-accent px-3 py-1 rounded-full border border-neutral/20">
                  {correctCount} dari {questions.length} soal benar
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-1 sm:p-2 border-t sm:border-t-0 sm:border-l border-neutral/15 pt-4 sm:pt-0">
                <span className="text-[11px] sm:text-xs font-black text-neutral/70 uppercase tracking-wider">
                  Tingkat Kemampuan
                </span>
                <span
                  className={`mt-2 sm:mt-3 px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl text-sm sm:text-lg font-black uppercase tracking-wide border-2 ${currentTheme.badgeBg}`}
                >
                  {level}
                </span>
                <span className="text-xs text-neutral/80 mt-2 sm:mt-3 font-medium text-center leading-relaxed">
                  {level === "beginner" && "Pemahaman dasar & kosakata sehari-hari"}
                  {level === "intermediate" && "Komunikasi lancar & struktur kalimat baik"}
                  {level === "advanced" && "Tingkat mahir, siap kebutuhan profesional"}
                </span>
              </div>
            </div>

            <div className="pt-2 sm:pt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <Link
                to="/test"
                onClick={() => goToQuestion(-1)}
                className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white hover:bg-neutral/10 text-neutral font-black text-xs sm:text-sm border-2 border-neutral/20 transition cursor-pointer text-center shadow-xs"
              >
                Ulangi Tes
              </Link>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl sm:rounded-2xl bg-primary hover:opacity-90 text-white font-black text-xs sm:text-sm shadow-md shadow-primary/30 transition cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>Lihat Rekomendasi Program</span>
              </button>
            </div>
          </div>
        )}

        {step === 2 && programsSuggestion && (
          <div className="bg-accent rounded-2xl sm:rounded-3xl p-5 sm:p-10 border-2 border-neutral/20 shadow-xl space-y-5 sm:space-y-6 text-left">
            <div className="flex items-center justify-between gap-2 flex-wrap pb-3 sm:pb-4 border-b-2 border-neutral/20">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-white bg-neutral px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full">
                Rekomendasi Program Belajar
              </span>
              <span className="text-[11px] sm:text-xs px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white text-primary border-2 border-neutral/20 font-black">
                Level {programsSuggestion.level.toUpperCase()}
              </span>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <h2 className="text-xl sm:text-3xl font-black text-neutral">
                {programsSuggestion.title}
              </h2>
              <p className="text-xs sm:text-base text-neutral/90 font-medium leading-relaxed">
                {programsSuggestion.description}
              </p>
            </div>

            <div className="pt-1 sm:pt-2">
              <h3 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-neutral/80 mb-2.5 sm:mb-3">
                Keuntungan & Materi Program:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {programsSuggestion.benefits.map((b, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-neutral font-semibold p-3 sm:p-3.5 rounded-xl bg-white border border-neutral/15 shadow-xs"
                  >
                    <span className="size-4 sm:size-5 rounded-full bg-accent text-neutral font-black flex items-center justify-center text-[10px] sm:text-xs shrink-0 mt-0.5 border border-neutral/20">
                      ✓
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 sm:pt-4 flex flex-col-reverse sm:flex-row items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:w-1/3 py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl bg-white hover:bg-neutral/10 text-neutral font-black text-xs sm:text-sm border-2 border-neutral/20 transition cursor-pointer text-center"
              >
                Kembali
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-2/3 inline-flex items-center justify-center gap-2.5 sm:gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer text-center"
              >
                <span>Konsultasi via WhatsApp</span>
                <svg className="size-4 sm:size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
