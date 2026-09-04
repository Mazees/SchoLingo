import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSession } from "../../../hooks/useSession";

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hash, setHash] = useState(location.hash || "#");
  const { isRegistered } = useSession();

  useEffect(() => {
    setHash(location.hash || "#");
  }, [location]);
  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-tertiary/90 backdrop-blur-md border-b border-primary/10 px-4 md:px-8 h-24">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              className="size-24 transition-transform duration-300 group-hover:scale-110"
              src="/icon.webp"
              alt="SchoLingo Icon"
            />
          </Link>
          <nav className="hidden md:block">
            <ul className="flex gap-8 lg:gap-12 text-primary font-semibold text-sm lg:text-base">
              <li
                className={`border-b-2 rounded-sm hover:border-primary ${hash === "#" ? "border-primary" : "border-transparent"} transition-colors duration-200 pb-0.5`}
              >
                <a href="#">Home</a>
              </li>
              <li
                className={`border-b-2 rounded-sm hover:border-primary ${hash === "#about" ? "border-primary" : "border-transparent"} transition-colors duration-200 pb-0.5`}
              >
                <a href="#about">About</a>
              </li>
              <li
                className={`border-b-2 rounded-sm hover:border-primary ${hash === "#how" ? "border-primary" : "border-transparent"} transition-colors duration-200 pb-0.5`}
              >
                <a href="#how">How It Works</a>
              </li>
            </ul>
          </nav>

          <div className="hidden md:block">
            <Link
              to={isRegistered ? "/test" : "/register"}
              className="inline-flex items-center justify-center bg-primary text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:opacity-90 active:scale-95 transition duration-200"
            >
              Start Quiz
            </Link>
          </div>
          <button
            type="button"
            onClick={toggleDrawer}
            className="md:hidden p-2 text-primary rounded-lg hover:bg-primary/10 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <svg
              className="size-6 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <img className="size-8" src="/icon.webp" alt="icon" />
              <span className="text-primary font-bold text-lg">SchoLingo</span>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 text-accent hover:bg-zinc-100 rounded-lg transition"
              aria-label="Close menu"
            >
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="mt-6">
            <ul className="flex flex-col gap-2 font-semibold text-primary">
              <li>
                <a
                  href="#"
                  onClick={closeDrawer}
                  className="flex items-center px-4 py-3 rounded-xl hover:bg-tertiary transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={closeDrawer}
                  className="flex items-center px-4 py-3 rounded-xl hover:bg-tertiary transition"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#how"
                  onClick={closeDrawer}
                  className="flex items-center px-4 py-3 rounded-xl hover:bg-tertiary transition"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="pt-4 border-t border-zinc-100">
          <Link
            to="/register"
            onClick={closeDrawer}
            className="w-full inline-flex items-center justify-center bg-primary text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:opacity-95 transition duration-200 text-center"
          >
            Start Quiz
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
