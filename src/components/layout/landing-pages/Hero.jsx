import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full h-[calc(100vh-96px)] min-h-145 overflow-hidden scroll-mt-24 "
    >
      <img
        src="/hero-bg.jpeg"
        alt="SchoLingo English Placement Test Hero"
        className="h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/70 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6 md:space-y-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase text-white leading-tight tracking-tight">
            Ukur Kemampuan <br />
            <span className="text-accent">Bahasa Inggris</span> Anda Secara
            Akurat
          </h1>

          <p className="max-w-2xl text-sm sm:text-base md:text-lg text-zinc-300 font-medium leading-relaxed">
            Ikuti asesmen singkat dengan 15 pertanyaan terstruktur. Dapatkan
            evaluasi level instan dan rekomendasi program belajar yang paling
            tepat untuk Anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:text-primary hover:bg-white text-white text-base font-bold px-8 py-3.5 rounded-xl transition-all"
            >
              Mulai Tes Sekarang
            </Link>

            <a
              href="#how"
              className="w-full sm:w-auto bg-neutral text-accent px-6 py-3.5 rounded-xl font-bold hover:bg-white hover:text-neutral transition-all"
            >
              Pelajari Dulu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
