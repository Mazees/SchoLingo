import Header from "../components/layout/landing-pages/Header";
import Hero from "../components/layout/landing-pages/Hero";
import About from "../components/layout/landing-pages/About";
import How from "../components/layout/landing-pages/How";

const LandingPage = () => {
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <About />
      <How />
    </div>
  );
};

export default LandingPage;
