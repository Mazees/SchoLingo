export const generateWhatsAppLink = ({
  phoneNumber = "6281234489008",
  userName = "",
  level = "",
  score = 0,
  programTitle = "",
}) => {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");

  const message = `Halo Admin SchoLingo!
  Saya ingin konsultasi hasil English Placement Test saya:
  - *Nama*: ${userName}\n- *Skor*: ${score}%
  - *Tingkat Level*: ${level.toUpperCase()}
  - *Rekomendasi Program*: ${programTitle}`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
