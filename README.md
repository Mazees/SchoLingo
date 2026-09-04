# SchoLingo - Multi-Step English Placement Test Engine

> **Live Deployment URL:** [https://scholingo.vercel.app](https://scholingo.vercel.app)  
> **GitHub Repository:** [https://github.com/Mazees/scholingo](https://github.com/username/scholingo)

---

## Ringkasan Proyek

**SchoLingo** adalah aplikasi web _Multi-Step Placement Test Engine_ modern yang dibangun menggunakan **React** dan **Tailwind CSS**. Aplikasi ini memandu calon peserta didik melalui alur registrasi biodata interaktif, pengerjaan placement test 15 butir soal secara komprehensif dengan navigasi bebas dan _auto-save_, hingga kalkulasi skor instan yang menghasilkan predikat kemampuan (_Beginner_, _Intermediate_, _Advanced_), rekomendasi program belajar, serta tautan konsultasi WhatsApp dinamis (_Call-to-Action_).

Aplikasi ini dikembangkan untuk memenuhi kriteria penugasan **Mini Project Seleksi Front-end Developer** ScholarsToday dengan standar arsitektur modular, performa responsif, dan _user experience_ (UX) yang mulus.

---

## Fitur Utama

### 1. Halaman Landing & Pengenalan Program

- Tampilan beranda interaktif dengan _Hero Section_, penjelasan alur kerja (_How It Works_), dan informasi program belajar.
- Tombol navigasi cepat (_CTA_) menuju form registrasi placement test.

### 2. Halaman Registrasi & Validasi Biodata (`/register`)

- Pengumpulan data identitas calon peserta: **Nama Lengkap**, **Email**, **Nomor WhatsApp**, **Kota Domisili**, dan pilihan **Target Program Belajar**.
- Validasi data sebelum peserta diperbolehkan melangkah ke ruang ujian.
- Penyimpanan sesi pengguna secara otomatis ke dalam `localStorage` dan `Context API`.

### 3. Engine Ujian Interaktif & Auto-Save (`/test`)

- **15 Soal Pilihan Ganda Terstruktur** dari berkas JSON lokal (`src/data/questions.json`) dengan proporsi:
  - 5 Soal _Grammar_
  - 4 Soal _Vocabulary_
  - 3 Soal _Reading Comprehension_ (dilengkapi _Reading Passage_)
  - 2 Soal _Sentence Structure_
  - 1 Soal _Functional English_
  - Pembagian bobot tingkat kesulitan: _Beginner_ (2 poin), _Intermediate_ (5 poin), dan _Advanced_ (15 poin).
- **Progress Bar Real-Time**: Memantau progres pengerjaan soal saat ini.
- **Navigasi Soal Bebas**: Lompat langsung ke nomor soal tertentu melalui nomor grid (1–15), serta tombol navigasi _Sebelumnya_ dan _Selanjutnya_.
- **Indikator Status Soal**: Visual pembeda yang jelas untuk nomor soal yang sedang aktif, sudah dijawab, dan belum dijawab.
- **Auto-Save ke LocalStorage**: Jawaban tersimpan secara instan sehingga progres tidak hilang jika halaman tidak sengaja dimuat ulang (_page refresh_).
- **Modal Konfirmasi Submit**: Konfirmasi pencegah klik tidak sengaja sebelum mengakhiri ujian dan menampilkan ringkasan jumlah soal yang telah dijawab.

### 4. Evaluasi Hasil, Predikat Level, & WhatsApp CTA (`/result`)

- **Kalkulasi Skor Otomatis**:
  - Skor maksimal 100 poin dihitung dari bobot jawaban benar.
  - Penentuan predikat kemampuan:
    - **Beginner**: 0 – 50 Poin
    - **Intermediate**: 51 – 75 Poin
    - **Advanced**: 76 – 100 Poin
- **Rekomendasi Program Terintegrasi**: Mengambil data kurikulum yang cocok secara dinamis dari `src/data/programs.json` (_English Foundation_, _English Intermediate_, atau _English Advanced_) lengkap dengan daftar keuntungan program.
- **Dynamic WhatsApp Action (CTA)**: Tombol aksi langsung ke WhatsApp admin (`wa.me`) dengan pesan otomatis yang memuat nama peserta, persentase skor, predikat level, dan nama program yang disarankan.

### 5. Keamanan Rute (_Route Guards / Protected Routes_)

- Melindungi rute `/test` agar hanya dapat diakses jika peserta telah mengisi biodata (`RequireSession`).
- Melindungi rute `/result` agar hanya dapat diakses setelah peserta menyelesaikan tes (`RequireResult`).

---

## Tech Stack & Kepatuhan Persyaratan

Proyek ini sepenuhnya mematuhi batasan teknis yang ditetapkan dalam ketentuan seleksi:

| Kategori             | Teknologi / Pendekatan                   | Keterangan Kepatuhan                                                                                                             |
| :------------------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| **Framework Utama**  | **React 19** + **Vite 6**                | Menggunakan SPA murni tanpa framework seperti Next.js/Remix.                                                                     |
| **Styling Engine**   | **Tailwind CSS v4**                      | Tanpa library komponen UI pihak ketiga (tanpa shadcn/ui, DaisyUI, Chakra, dll). Seluruh komponen UI dibuat murni secara mandiri. |
| **Routing**          | **React Router DOM v7**                  | Manajemen multi-page SPA (`/`, `/register`, `/test`, `/result`) beserta Protected Route.                                         |
| **State Management** | **React Context API** + **Custom Hooks** | Terisolasi rapi melalui `QuizContext`, `useQuiz`, dan `useSession`.                                                              |
| **Persistensi Data** | **Web Storage API (localStorage)**       | Menyimpan sesi pengguna, jawaban ujian secara berkala, dan status submit.                                                        |
| **Sumber Data**      | **Structured Local JSON**                | Data dikelola di `src/data/questions.json` dan `src/data/programs.json`.                                                         |

---

## Struktur Direktori Proyek

```text
scholingo/
├── public/                     # Aset statis publik (favicon, icons)
├── src/
│   ├── assets/                 # Aset grafis & gambar lokal
│   ├── components/
│   │   ├── common/             # Komponen global & pelindung rute (ProtectedRoute.jsx)
│   │   ├── layout/
│   │   │   ├── landing-pages/  # Komponen landing page (Hero, About, How, Header)
│   │   │   └── register-pages/ # Komponen formulir pendaftaran (BiodataForm.jsx)
│   │   └── quiz/               # Komponen pengerjaan kuis (ProgressBar, QuestionCard, OptionButton, QuestionNavigation, ConfirmSubmitModal)
│   ├── context/
│   │   └── QuizContext.jsx     # Sentral state management (sesi, navigasi, jawaban, skor)
│   ├── data/
│   │   ├── programs.json       # Dataset katalog program kursus & manfaatnya
│   │   └── questions.json      # Dataset 15 butir soal placement test terstruktur
│   ├── hooks/
│   │   ├── useQuiz.js          # Custom hook untuk akses data & fungsi kuis
│   │   └── useSession.js       # Custom hook untuk data sesi peserta
│   ├── pages/
│   │   ├── LandingPage.jsx     # Halaman beranda
│   │   ├── RegisterPage.jsx    # Halaman input data diri peserta
│   │   ├── TestPage.jsx        # Halaman pengerjaan placement test
│   │   └── ResultPage.jsx      # Halaman kalkulasi skor, level, dan rekomendasi
│   ├── utils/
│   │   ├── storage.js          # Helper interaksi localStorage yang aman
│   │   └── whatsapp.js         # Generator tautan WhatsApp dengan query parameter pesan
│   ├── App.jsx                 # Routing utama dan Provider pembungkus
│   ├── index.css               # Setup Tailwind CSS v4 & custom design tokens
│   └── main.jsx                # Entry point aplikasi
├── PROMPT.md                   # Dokumentasi seluruh prompt Artificial Intelligence (AI)
├── README.md                   # Dokumentasi teknis proyek
├── package.json
└── vite.config.js
```

---

## Cara Menjalankan Proyek Secara Lokal

Pastikan Anda telah menginstal **Node.js** (rekomendasi versi LTS `>= 18.x`) dan package manager **npm**.

1. **Clone Repositori:**

   ```bash
   git clone https://github.com/username/scholingo.git
   cd scholingo
   ```

2. **Instal Dependensi:**

   ```bash
   npm install
   ```

3. **Jalankan Development Server:**

   ```bash
   npm run dev
   ```

   Aplikasi akan berjalan secara lokal di `http://localhost:5173`.

4. **Build untuk Produksi:**

   ```bash
   npm run build
   ```

5. **Pratinjau Hasil Build:**
   ```bash
   npm run preview
   ```

---

## Catatan Penggunaan Artificial Intelligence (AI)

Sesuai dengan ketentuan penugasan seleksi:

> _"Apabila peserta menggunakan bantuan Artificial Intelligence (AI) dalam proses pengerjaan, seluruh prompt yang digunakan wajib dicantumkan secara lengkap dalam dokumentasi proyek."_

Seluruh prompt yang digunakan dalam perancangan struktur proyek, penyusunan dataset 15 soal placement test, pembuatan logika context, hingga perancangan alur kuis telah didokumentasikan secara transparan pada berkas:
**[Lihat Dokumentasi Lengkap di PROMPT.md](./prompt)**
