const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-tertiary">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-accent font-bold text-sm tracking-wider uppercase">
          Tentang SchoLingo
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-neutral tracking-tight">
          Cari Tahu Level Bahasa Inggris Anda dengan Mudah
        </h2>
        <p className="mt-4 text-base sm:text-lg text-neutral/70 max-w-2xl mx-auto">
          SchoLingo dirancang untuk membantu Anda mengetahui kemampuan bahasa Inggris secara cepat dan objektif melalui 15 soal terstruktur.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-xs">
            <span className="text-2xl font-black text-primary">01</span>
            <h3 className="text-lg font-bold text-neutral mt-2">Soal Komprehensif</h3>
            <p className="text-sm text-neutral/70 mt-2">
              Mencakup Grammar, Vocabulary, Reading Comprehension, Sentence Structure, dan Functional English.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-xs">
            <span className="text-2xl font-black text-accent">02</span>
            <h3 className="text-lg font-bold text-neutral mt-2">Evaluasi Instan</h3>
            <p className="text-sm text-neutral/70 mt-2">
              Skor akhir dan penentuan level (Beginner, Intermediate, atau Advanced) langsung keluar begitu selesai.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-xs">
            <span className="text-2xl font-black text-primary">03</span>
            <h3 className="text-lg font-bold text-neutral mt-2">Rekomendasi Program</h3>
            <p className="text-sm text-neutral/70 mt-2">
              Dapatkan rekomendasi kelas belajar yang paling sesuai dengan kebutuhan peningkatan Anda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
