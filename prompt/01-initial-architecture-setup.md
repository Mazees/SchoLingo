# PRD Prompt 01: Project Setup, Architecture & Mock Dataset

> **System Prompt / Instruction to AI:**  
> Bertindaklah sebagai **Senior Frontend Engineer**. Tugas Anda adalah menginisialisasi arsitektur fondasi proyek aplikasi **SchoLingo — Multi-Step English Placement Test Engine** berdasarkan spesifikasi Product Requirement Document (PRD) teknis di bawah ini.

---

## 1. Overview & Objective
Membangun fondasi arsitektur Single Page Application (SPA) untuk aplikasi kuis placement test bahasa Inggris bertingkat (*multi-step*). Seluruh struktur folder, sistem routing, Context API, utility persistensi, serta mock dataset lokal harus disiapkan dengan standar *clean code* dan modular sebelum pengerjaan komponen UI spesifik.

---

## 2. Technical Stack & Mandatory Constraints
- **Framework:** React 19 dengan Vite sebagai build tool.
- **Language:** JavaScript (JSX, ES Module).
- **CSS Framework:** Tailwind CSS v4 (@tailwindcss/vite).
- **Routing:** React Router DOM v7.
- **State Management:** React Context API + Custom Hooks.
- **Batasan Mutlak:** 
  - DILARANG menggunakan framework berbasis SSR/hybrid seperti Next.js atau Remix.
  - DILARANG menggunakan styled UI component library pihak ketiga (seperti shadcn/ui, DaisyUI, MUI, Chakra UI, dsb). Seluruh antarmuka harus dibangun *from scratch* menggunakan utility classes Tailwind CSS.

---

## 3. Project Architecture & Directory Structure
Buat struktur direktori berikut dengan pemisahan *concern* yang jelas:

```text
src/
├── assets/
│   └── hero.png
├── components/
│   ├── common/             # Komponen global & route guards (ProtectedRoute.jsx)
│   ├── layout/
│   │   ├── landing-pages/  # Komponen landing page (Header, Hero, About, How)
│   │   └── register-pages/ # Komponen formulir registrasi (BiodataForm)
│   └── quiz/               # Komponen pengerjaan kuis (QuestionCard, OptionButton, ProgressBar, Nav, Modal)
├── context/
│   └── QuizContext.jsx     # Sentral state kuis, sesi user, jawaban, & kalkulasi
├── hooks/
│   ├── useQuiz.js          # Custom hook konsumsi QuizContext
│   └── useSession.js       # Custom hook abstraksi sesi registrasi user
├── data/
│   ├── questions.json      # Mock dataset 15 soal placement test
│   └── programs.json       # Mock dataset katalog program & kurikulum
├── utils/
│   ├── storage.js          # Helper interaksi aman localStorage (try/catch)
│   └── whatsapp.js         # Helper generator tautan wa.me dengan URL query
├── pages/
│   ├── LandingPage.jsx     # Halaman utama
│   ├── RegisterPage.jsx    # Halaman registrasi biodata
│   ├── TestPage.jsx        # Halaman pengerjaan tes
│   └── ResultPage.jsx      # Halaman evaluasi skor & rekomendasi
├── App.jsx                 # Provider wrapper & Route configuration
├── index.css               # Setup Tailwind CSS v4 & theme tokens
└── main.jsx                # Entry point aplikasi
```

---

## 4. Routing & Route Guard Specifications
Konfigurasikan rute menggunakan React Router DOM:
1. `/` -> `LandingPage`: Halaman awal pengenalan aplikasi.
2. `/register` -> `RegisterPage`: Formulir pengisian biodata peserta.
3. `/test` -> `TestPage`: Dilindungi oleh `RequireSession` (hanya bisa diakses jika user sudah mengisi biodata).
4. `/result` -> `ResultPage`: Dilindungi oleh `RequireResult` (hanya bisa diakses jika user sudah mengisi biodata DAN telah melakukan submit ujian).

---

## 5. Mock Dataset Specifications

### 5.1 `src/data/questions.json` (Tepat 15 Soal Terstruktur)
Format data soal:
```json
{
  "id": 1,
  "category": "grammar",
  "difficulty": "beginner",
  "points": 2,
  "passage": "Optional string untuk reading comprehension",
  "question": "Pertanyaan dalam bahasa Inggris yang natural",
  "options": ["Opsi A", "Opsi B", "Opsi C", "Opsi D"],
  "correctAnswer": 0
}
```
**Komposisi Kategori:**
- 5 Soal *Grammar*
- 4 Soal *Vocabulary*
- 3 Soal *Reading Comprehension* (wajib memuat `passage` narasi)
- 2 Soal *Sentence Structure*
- 1 Soal *Functional English*

**Distribusi Tingkat Kesulitan & Bobot Poin:**
- 5 Soal Beginner (masing-masing 2 poin) = 10 poin
- 6 Soal Intermediate (masing-masing 5 poin) = 30 poin
- 4 Soal Advanced (masing-masing 15 poin) = 60 poin
- **Total Poin Maksimal:** 100 Poin.

### 5.2 `src/data/programs.json` (3 Katalog Program)
Format data program:
```json
{
  "level": "beginner | intermediate | advanced",
  "title": "Nama Program",
  "description": "Ringkasan kurikulum dan sasaran belajar",
  "benefits": ["Benefit 1", "Benefit 2", "Benefit 3", "Benefit 4"]
}
```
- Level `beginner`: **English Foundation**
- Level `intermediate`: **English Intermediate**
- Level `advanced`: **English Advanced**

---

## 6. Storage & Utility Layer
Implementasikan helper pada `src/utils/storage.js`:
- `saveUserSession(userData)` & `getUserSession()` dengan storage key `scholingo_user_session`.
- `saveQuizAnswers(answers)` & `getQuizAnswers()` dengan storage key `scholingo_answers`.
- `saveSubmitStatus(status)` & `getSubmitStatus()` dengan storage key `scholingo_is_submitted`.
- `clearTestStorage()` untuk mereset sesi kuis.
- Semua fungsi wajib dibungkus dalam blok `try/catch` agar tidak merusak UI jika penyimpanan browser diblokir.

---
