# PRD Prompt 03: Interactive Test Engine & Real-Time Navigation

> **System Prompt / Instruction to AI:**  
> Bertindaklah sebagai **Senior Frontend Engineer**. Kembangkan ruang ujian interaktif (Multi-Step Placement Test Engine) pada halaman `/test` untuk aplikasi **SchoLingo** berdasarkan Product Requirement Document (PRD) berikut.

---

## 1. Overview & Feature Goal
Mengembangkan antarmuka pengerjaan placement test yang memandu peserta menyelesaikan 15 butir soal pilihan ganda secara interaktif. Sistem wajib menyediakan fitur layar sambutan sebelum mulai, kartu soal modular, navigasi bebas 15 nomor, indikator progress bar real-time, auto-save jawaban ke storage, dan modal konfirmasi submit.

---

## 2. Component Breakdown & Functional Specifications

### 2.1 Welcome / Prep Screen (`TestPage.jsx`)
Sebelum pengguna menekan tombol mulai:
- Sembunyikan soal kuis terlebih dahulu (`currentQuestionIndex === -1`).
- Tampilkan card sambutan yang memuat:
  - Sapaan nama depan peserta (`userSession.name`).
  - Target program yang dipilih saat pendaftaran.
  - Tombol **"Mulai Sekarang"** untuk mengaktifkan kuis (`startQuiz() -> set currentQuestionIndex = 0`).
  - Jika kuis pernah disubmit sebelumnya (`isSubmitted === true`), sediakan tombol sekunder **"Lihat Riwayat"** yang mengarah langsung ke `/result`.

### 2.2 Question Card & Option Button (`QuestionCard.jsx`, `OptionButton.jsx`)
- Menampilkan metadata soal:
  - Kategori soal (*Grammar*, *Vocabulary*, *Reading Comprehension*, dll).
  - Badge tingkat kesulitan (*BEGINNER*, *INTERMEDIATE*, *ADVANCED*) dan bobot poin.
- Jika soal memiliki atribut `passage`, render kontainer kutipan bacaan dengan styling latar belakang terpisah dan tipografi yang nyaman dibaca (*italic with clear quote marks*).
- Render teks pertanyaan dengan ukuran font tegas dan jelas.
- Render 4 tombol pilihan jawaban menggunakan komponen modular `OptionButton`:
  - Menerima props: `label` ("A", "B", "C", "D"), `text`, `isSelected`, dan `onClick`.
  - State aktif: background berubah dengan aksen ring/border warna primer, badge label terisi penuh.
  - State normal: border halus, hover efek transisi lembut.

### 2.3 Progress Bar Component (`ProgressBar.jsx`)
- Menerima props `current` (indeks pertanyaan aktif) dan `total` (jumlah total pertanyaan).
- Menampilkan teks: *"Pertanyaan X dari Y"* dan persentase penyelesaian kuis.
- Bar visual dengan animasi transisi bar yang halus (`transition-all duration-300 ease-out`).

### 2.4 Question Navigation Panel (`QuestionNavigation.jsx`)
Panel navigasi di sisi samping (atau bawah pada mobile) yang memuat:
1. **Status Counter:** Menampilkan jumlah soal yang sudah terjawab vs total soal (cth: `(12/15 Terjawab)`).
2. **Grid 15 Tombol Soal:**
   - Grid 5 kolom dengan 3 baris.
   - Pembeda visual 3 status:
     * **Nomor Aktif:** Border tebal warna primer / indikator fokus.
     * **Nomor Terjawab:** Background warna primer dengan teks putih.
     * **Nomor Belum Terjawab:** Background netral/abu lembut.
   - Pengguna dapat mengklik nomor mana pun untuk melompat langsung ke soal tersebut (`goToQuestion(index)`).
3. **Action Controls:**
   - Tombol **"Sebelumnya"**: mundur 1 soal (disabled jika di soal nomor 1).
   - Tombol **"Selanjutnya"**: maju 1 soal.
   - Pada soal nomor terakhir (nomor 15), gantikan tombol "Selanjutnya" dengan tombol **"Kumpulkan"** yang memicu modal konfirmasi submit.

### 2.5 Auto-Save & State Isolation
- Setiap kali peserta memilih jawaban via `selectAnswer(questionId, optionIndex)`:
  - Perbarui state `answers` di `QuizContext`.
  - Simpan segera ke `localStorage` melalui `saveQuizAnswers(answers)`.
  - Jawaban tidak boleh hilang saat halaman dimuat ulang (*anti-data-loss*).

### 2.6 Confirmation Submit Modal (`ConfirmSubmitModal.jsx`)
- Dialog overlay yang muncul saat tombol "Kumpulkan" diklik.
- Menampilkan statistik:
  - Berapa soal yang telah dijawab dari total 15 soal.
  - Jika masih ada soal kosong, beri peringatan bahwa masih ada soal yang belum dikerjakan.
- Tombol aksi:
  - **"Periksa Kembali"**: Menutup modal dan kembali memeriksa jawaban.
  - **"Kumpulkan Jawaban"**: Menjalankan `finishTest()`, menandai `isSubmitted = true`, menyimpan status ke `localStorage`, dan me-redirect pengguna ke `/result`.

---