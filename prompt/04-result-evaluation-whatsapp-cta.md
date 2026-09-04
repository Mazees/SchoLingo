# PRD Prompt 04: Result Evaluation, Leveling Engine & WhatsApp CTA

> **System Prompt / Instruction to AI:**  
> Bertindaklah sebagai **Senior Frontend Engineer**. Kembangkan modul halaman evaluasi hasil (`/result`) untuk aplikasi **SchoLingo** berdasarkan Product Requirement Document (PRD) berikut. Seluruh logika kalkulasi skor, penentuan level kecakapan, rekomendasi program belajar, serta tautan konsultasi WhatsApp dinamis harus diimplementasikan secara terstruktur dan modular.

---

## 1. Overview & Feature Goal
Membangun antarmuka evaluasi hasil placement test (`ResultPage.jsx`) yang memandu peserta melihat pencapaian mereka setelah menyelesaikan 15 butir soal. Halaman ini menyajikan skor terukur, predikat level kemampuan bahasa Inggris (*Beginner*, *Intermediate*, *Advanced*), kartu rincian program belajar yang disarankan, serta tombol aksi (*Call-to-Action*) direct WhatsApp ke nomor admin dengan pesan otomatis terpersonalisasi.

---

## 2. Functional & Technical Specifications

### 2.1 Route Guard Specification
- Halaman `/result` berada di bawah proteksi `RequireResult`:
  - Akses ditolak jika peserta belum terdaftar (`isRegistered === false`), dialihkan ke `/register`.
  - Akses ditolak jika kuis belum diselesaikan/disubmit (`isSubmitted === false`), dialihkan ke `/test`.

### 2.2 Scoring & Leveling Logic
Implementasikan kalkulasi skor terpusat di `QuizContext.jsx` atau dipanggil melalui `getResult()`:
1. **Total Skor:**
   - Dihitung berdasarkan akumulasi bobot `points` dari setiap soal yang dijawab dengan benar (`answers[question.id] === question.correctAnswer`).
   - Bobot: Beginner (2 pt x 5 soal = 10 pt), Intermediate (5 pt x 6 soal = 30 pt), Advanced (15 pt x 4 soal = 60 pt).
   - Nilai Maksimal: 100 Poin.
2. **Hitung Rasio Benar:**
   - Akumulasi total butir soal yang benar (misal: `12 dari 15 soal benar`).
3. **Threshold Predikat Level:**
   - Skor `0` – `50`: **`beginner`**
   - Skor `51` – `75`: **`intermediate`**
   - Skor `76` – `100`: **`advanced`**
4. **Pencocokan Program Belajar:**
   - Cari data program dari `programs.json` yang memiliki nilai `level === calculatedLevel`.

### 2.3 User Interface: Multi-Step Evaluation Card (`ResultPage.jsx`)
Gunakan pola antarmuka 2 tahap (*stepper/tab UX*) agar informasi diserap bertahap dengan nyaman:

#### Tahap 1: Evaluasi Skor & Level (`step === 1`)
- **Badge Header:** Label *"Placement Test Evaluation"*.
- **Sapaan Personal:** Menampilkan nama peserta yang terdaftar (contoh: *"Selamat, Budi Santoso!"*).
- **Metric Card (Grid 2 Kolom):**
  - **Kolom Kiri (Skor):** Tampilan skor besar mencolok dengan format `[Skor] /100` dan badge jumlah soal benar.
  - **Kolom Kanan (Level):** Badge level kemampuan dengan tema warna spesifik:
    - *Beginner:* Aksen biru lembut / tertiary.
    - *Intermediate:* Aksen kuning emas / accent.
    - *Advanced:* Aksen warna primer dengan teks kontras.
  - Deskripsi singkat pencapaian level peserta.
- **Navigasi Tombol:**
  - Tombol **"Ulangi Tes"**: Mengarahkan kembali ke `/test` untuk mengulang pengerjaan.
  - Tombol **"Lihat Rekomendasi Program"**: Mengubah state ke `step === 2`.

#### Tahap 2: Detail Program & WhatsApp CTA (`step === 2`)
- **Header Program:** Badge level dan judul program belajar (*English Foundation* / *English Intermediate* / *English Advanced*).
- **Deskripsi Program:** Narasi tujuan kurikulum dan fokus pembelajaran.
- **Daftar Keuntungan & Materi:**
  - Grid daftar bullet points berisi manfaat program (`benefits`) yang diambil secara dinamis dari `programs.json`.
  - Dilengkapi ikon centang atau penanda visual rapi.
- **Action Buttons:**
  - Tombol **"Kembali"**: Mengembalikan tampilan ke `step === 1`.
  - Tombol **"Konsultasi via WhatsApp"**: Tombol hijau WhatsApp (`bg-emerald-600 hover:bg-emerald-700`) yang membuka link WhatsApp dinamis di tab baru.

### 2.4 Dynamic WhatsApp Message Generator (`src/utils/whatsapp.js`)
Fungsi `generateWhatsAppLink({ phoneNumber, userName, level, score, programTitle })`:
- Membersihkan karakter nomor telepon menjadi hanya angka (`cleanPhone`).
- Menyusun format pesan WhatsApp otomatis:
  ```text
  Halo Admin SchoLingo! 👋

  Saya ingin konsultasi hasil English Placement Test saya:
  - *Nama*: [Nama Peserta]
  - *Skor*: [Skor]%
  - *Tingkat Level*: [LEVEL]
  - *Rekomendasi Program*: [Nama Program]

  Mohon info detail pendaftaran dan jadwal kelasnya. Terima kasih!
  ```
- Mengembalikan format tautan: `https://wa.me/[phone]?text=[encodedMessage]`.

---
