async function generateDescription() {
  const productName = document.getElementById("productName").value.trim();
  const productInfo = document.getElementById("productInfo").value.trim();
  const style = document.getElementById("style").value;
  const result = document.getElementById("result");

  if (!productName || !productInfo) {
    result.textContent = "Mohon isi nama produk dan keunggulannya.";
    return;
  }

  result.textContent = "⏳ AI sedang membuat deskripsi...";

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
      throw new Error(data.error || "Gagal membuat deskripsi.");
    }

    result.textContent = data.result;

  } catch (error) {
    console.error(error);
    result.textContent =
      "❌ Gagal menghubungi AI. Silakan coba lagi.";
  }
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
