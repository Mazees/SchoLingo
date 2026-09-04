# PRD Prompt 02: Registration & Biodata Form Engine

> **System Prompt / Instruction to AI:**  
> Bertindaklah sebagai **Senior Frontend Engineer**. Kembangkan modul halaman pendaftaran dan formulir biodata peserta untuk aplikasi **SchoLingo** berdasarkan Product Requirement Document (PRD) berikut.

---

## 1. Overview & Feature Goal
Membangun halaman registrasi (`/register`) dan komponen formulir biodata (`BiodataForm.jsx`) yang bertugas mengumpulkan identitas calon peserta didik sebelum memasuki ruang ujian. Formulir ini harus memvalidasi data input, menyimpan data ke dalam sesi aplikasi (`QuizContext` & `localStorage`), dan mengarahkan pengguna secara mulus ke rute `/test`.

---

## 2. Functional Requirements & Form Specifications

### 2.1 Form Field Definitions
Formulir wajib menangani field-field berikut:
1. **Nama Lengkap (`name`):**
   - Tipe: Text input
   - Wajib diisi (Required)
   - Placeholder: `cth. Budi Santoso`
2. **Email (`email`):**
   - Tipe: Email input
   - Wajib diisi (Required)
   - Placeholder: `cth. budi@example.com`
3. **Nomor WhatsApp (`phone`):**
   - Tipe: Tel input
   - Wajib diisi (Required)
   - Placeholder: `cth. 08123456789`
4. **Kota Domisili (`domicile`):**
   - Tipe: Text input
   - Wajib diisi (Required)
   - Placeholder: `cth. Jakarta, Bandung, Surabaya`
5. **Target Program Belajar (`targetProgram`):**
   - Tipe: Select dropdown
   - Pilihan: Default `"Belum Tahu / Cek Level Dulu"` atau opsi program yang di-fetch secara dinamis dari `src/data/programs.json` via context (`programs`).

### 2.2 Form Validation Rules
- Lakukan validasi data sebelum submission:
  - Cek apakah field `name`, `email`, dan `phone` sudah terisi (non-empty string setelah di-`trim()`).
  - Jika ada data wajib yang kosong, hentikan alur dan tampilkan pesan error yang jelas kepada pengguna (misal: *"Nama, Email, dan WhatsApp wajib diisi."*).
  - Hilangkan pesan error secara otomatis ketika pengguna mulai mengetik kembali pada input mana pun.

### 2.3 Submission & State Flow
1. Saat form disubmit dan valid:
   - Susun payload objek sesi:
     ```javascript
     {
       name: formData.name.trim(),
       email: formData.email.trim(),
       phone: formData.phone.trim(),
       domicile: formData.domicile.trim() || "-",
       targetProgram: formData.targetProgram,
       registeredAt: new Date().toISOString()
     }
     ```
   - Panggil `registerUser(userData)` dari `useSession` / `QuizContext`.
   - Simpan objek tersebut ke `localStorage` melalui helper `saveUserSession`.
   - Lakukan redirect programatik menggunakan React Router: `navigate('/test')`.

---

## 3. UI & Design Guidelines
- Bangun UI murni dengan **Tailwind CSS** (tanpa UI library eksternal).
- Card formulir berada di tengah layar (*center aligned*), memiliki batasan lebar maksimal (`max-w-md`), sudut melengkung (`rounded-2xl`), dan shadow halus.
- Styling input:
  - Border lembut dengan efek transisi fokus (`focus:ring-1 focus:ring-primary focus:border-primary`).
  - Label informatif dengan tanda bintang merah (`*`) untuk field wajib.
- Tombol submit interaktif:
  - Warna aksen utama (`bg-primary`), teks tebal, hover opacity transition, dan cursor pointer.

---
