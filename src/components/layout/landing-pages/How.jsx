import { Link } from "react-router-dom";

const How = () => {
  const steps = [
    {
      number: "1",
      title: "Isi Data Diri",
      desc: "Masukkan nama dan nomor WhatsApp Anda untuk menyimpan sesi tes.",
    },
    {
      number: "2",
      title: "Kerjakan 15 Soal",
      desc: "Jawab soal pilihan ganda dengan durasi pengerjaan santai sekitar 10 menit.",
    },
    {
      number: "3",
      title: "Lihat Hasil & Rekomendasi",
      desc: "Ketahui skor, level kemahiran, dan program belajar yang disarankan untuk Anda.",
    },
  ];

  return (
    <section id="how" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-accent font-bold text-sm tracking-wider uppercase">
          Cara Kerja
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-neutral tracking-tight">
          3 Langkah Mudah Memulai
        </h2>
        <p className="mt-4 text-base sm:text-lg text-neutral/70 max-w-2xl mx-auto">
          Tidak perlu persiapan rumit. Anda bisa langsung memulai tes kapan saja.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-tertiary/50 border border-primary/10 flex flex-col justify-between"
            >
              <div>
                <div className="size-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-base mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-neutral">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral/70 mt-2">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/register"
            className="inline-flex items-center justify-center bg-primary hover:opacity-90 text-white font-bold px-8 py-3.5 rounded-xl transition-all"
          >
            Mulai Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
};

export default How;
