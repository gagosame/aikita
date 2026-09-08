async function generateDescription() {
  const productName = document.getElementById("productName").value.trim();
  const productInfo = document.getElementById("productInfo").value.trim();
  const style = document.getElementById("style").value;

  const result = document.getElementById("result");
  const button = document.querySelector(".generate-btn");

  if (!productName || !productInfo) {
    result.innerHTML = `
      <div class="empty-result">
        <div class="empty-icon">⚠️</div>
        <h3>Data belum lengkap</h3>
        <p>Isi nama produk dan keunggulan produk terlebih dahulu.</p>
      </div>
    `;
    return;
  }

  // Kondisi loading
  button.disabled = true;
  button.textContent = "⏳ AI sedang bekerja...";

  result.innerHTML = `
    <div class="empty-result">
      <div class="empty-icon">✨</div>
      <h3>Sedang membuat deskripsi...</h3>
      <p>AIKita sedang menyusun teks terbaik untuk produk kamu.</p>
    </div>
  `;

  try {
    const response = await fetch(
      "https://aikita-api.gagosame.workers.dev",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productName: productName,
          productInfo: productInfo,
          style: style
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Gagal membuat deskripsi."
      );
    }

    if (!data.result) {
      throw new Error("AI tidak mengembalikan hasil.");
    }

    // Tampilkan hasil AI
    result.textContent = data.result;

  } catch (error) {

    console.error(error);

    result.innerHTML = `
      <div class="empty-result">
        <div class="empty-icon">😕</div>
        <h3>Maaf, terjadi masalah</h3>
        <p>
          AIKita tidak dapat membuat deskripsi saat ini.
          Silakan coba lagi.
        </p>
      </div>
    `;

  } finally {

    button.disabled = false;
    button.textContent = "✨ Buat Deskripsi dengan AI";
  }
}


async function copyResult() {
  const result = document.getElementById("result").textContent.trim();

  if (
    !result ||
    result.includes("Hasil akan muncul di sini") ||
    result.includes("Sedang membuat deskripsi")
  ) {
    alert("Belum ada hasil yang bisa disalin.");
    return;
  }

  try {

    await navigator.clipboard.writeText(result);

    const button = document.querySelector(".copy-btn");
    const originalText = button.textContent;

    button.textContent = "✅ Tersalin!";

    setTimeout(() => {
      button.textContent = originalText;
    }, 1500);

  } catch (error) {

    alert("Gagal menyalin hasil.");

  }
}
