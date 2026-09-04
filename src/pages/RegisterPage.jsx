import { Link } from "react-router-dom";
import BiodataForm from "../components/layout/register-pages/BiodataForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-tertiary flex flex-col items-center justify-center pb-4">
      <Link to="/" className="inline-flex items-center gap-2">
        <img src="/icon.webp" alt="SchoLingo Icon" className="size-24" />
      </Link>

      <BiodataForm />

      <div className="mt-6 text-center">
        <Link
          to="/"
          className="text-sm text-neutral/70 hover:text-primary transition-colors"
        >
          &larr; Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
