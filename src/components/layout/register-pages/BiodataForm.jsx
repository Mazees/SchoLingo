import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../../hooks/useSession";
import { useQuiz } from "../../../hooks/useQuiz";
import ConfirmModal from "../../common/ConfirmModal";

const BiodataForm = () => {
  const navigate = useNavigate();
  const { registerUser } = useSession();
  const { programs } = useQuiz();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    domicile: "",
    targetProgram: "Belum Tahu / Cek Level Dulu",
  });

  const [error, setError] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.domicile.trim()
    ) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    setIsConfirmOpen(true);
  };

  const handleConfirmRegister = () => {
    setIsConfirmOpen(false);

    registerUser({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      domicile: formData.domicile.trim(),
      targetProgram: formData.targetProgram,
      registeredAt: new Date().toISOString(),
    });

    navigate("/test");
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-primary/10">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-neutral">Data Peserta</h2>
        <p className="text-sm text-neutral/70 mt-1">
          Lengkapi formulir singkat ini sebelum memulai tes
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-sm font-semibold text-neutral mb-1.5">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="cth. Budi Santoso"
            value={formData.name}
            onChange={handleChange}
            className="w-full text-neutral px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="cth. budi@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full text-neutral px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral mb-1.5">
            Nomor WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="cth. 08123456789"
            value={formData.phone}
            onChange={handleChange}
            className="w-full text-neutral  px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral mb-1.5">
            Kota Domisili <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="domicile"
            placeholder="cth. Jakarta, Bandung, Surabaya"
            value={formData.domicile}
            onChange={handleChange}
            className="w-full text-neutral  px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral mb-1.5">
            Target Program Belajar
          </label>
          <select
            name="targetProgram"
            value={formData.targetProgram}
            onChange={handleChange}
            className="w-full text-neutral  px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-white"
          >
            <option defaultValue value="Belum Tahu / Cek Level Dulu">
              Belum Tahu / Cek Level Dulu
            </option>
            {programs.map((prog, idx) => (
              <option key={prog.level} value={prog.title}>
                {prog.title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full mt-2 bg-primary hover:opacity-90 text-white font-bold py-3 rounded-xl transition-all cursor-pointer"
        >
          Mulai Placement Test
        </button>
      </form>

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Konfirmasi Data Peserta"
        message={
          <div className="space-y-3 text-left bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
            <div className="text-xs space-y-1 text-neutral">
              <div>
                <strong>Nama:</strong> {formData.name}
              </div>
              <div>
                <strong>Email:</strong> {formData.email}
              </div>
              <div>
                <strong>WhatsApp:</strong> {formData.phone}
              </div>
              <div>
                <strong>Domisili:</strong> {formData.domicile}
              </div>
              <div>
                <strong>Target:</strong> {formData.targetProgram}
              </div>
            </div>
            <p className="text-xs text-neutral font-medium bg-accent p-2.5 rounded-lg border border-amber-200">
              Perhatian: Data profil ini <strong>tidak dapat diubah</strong>{" "}
              setelah Anda memulai tes. Pastikan seluruh data sudah benar.
            </p>
          </div>
        }
        iconType="warning"
        confirmVariant="primary"
        confirmText="Ya, Data Sudah Benar"
        cancelText="Periksa Kembali"
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmRegister}
      />
    </div>
  );
};

export default BiodataForm;
