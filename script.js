async function generateDescription() {
  const productName = document.getElementById("productName").value.trim();
  const productInfo = document.getElementById("productInfo").value.trim();
  const style = document.getElementById("style").value;

  const result = document.getElementById("result");

  if (!productName || !productInfo) {
    result.textContent = "Mohon isi nama produk dan keunggulannya.";
    return;
  }

  result.textContent = "⏳ Sedang membuat deskripsi...";

  // Untuk sementara kita gunakan simulasi AI.
  // API AI akan kita pasang setelah website online.

  setTimeout(() => {
    let description = "";

    if (style === "Profesional") {
      description =
        `${productName}\n\n` +
        `${productName} hadir dengan berbagai keunggulan yang cocok ` +
        `untuk kebutuhan sehari-hari.\n\n` +
        `Keunggulan: ${productInfo}\n\n` +
        `Pilihan tepat bagi kamu yang mengutamakan kualitas dan kenyamanan.`;
    }

    else if (style === "Santai") {
      description =
        `Lagi cari ${productName} yang keren dan nyaman? 😍\n\n` +
        `Produk ini punya keunggulan: ${productInfo}.\n\n` +
        `Cocok banget buat kamu yang ingin tampil nyaman setiap hari!`;
    }

    else if (style === "Menjual") {
      description =
        `🔥 ${productName} — Pilihan Tepat Untuk Kamu!\n\n` +
        `Nikmati berbagai keunggulan: ${productInfo}.\n\n` +
        `Jangan sampai ketinggalan. Yuk, dapatkan ${productName} sekarang!`;
    }

    else {
      description =
        `${productName}\n\n` +
        `${productInfo}.\n\n` +
        `Cocok untuk penggunaan sehari-hari.`;
    }

    result.textContent = description;
  }, 800);
}


function copyResult() {
  const result = document.getElementById("result").textContent;

  navigator.clipboard.writeText(result)
    .then(() => {
      alert("✅ Deskripsi berhasil disalin!");
    })
    .catch(() => {
      alert("Gagal menyalin teks.");
    });
        }
