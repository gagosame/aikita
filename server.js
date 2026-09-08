const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 10000;

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
  res.json({
    message: "AIKita API berhasil berjalan 🚀"
  });
});

app.post("/api/generate", async (req, res) => {
  try {
    const { productName, productInfo, style } = req.body;

    if (!productName || !productInfo) {
      return res.status(400).json({
        error: "Nama produk dan keunggulan produk wajib diisi."
      });
    }

    const prompt = `
Buat deskripsi produk dalam bahasa Indonesia.

Nama produk:
${productName}

Keunggulan produk:
${productInfo}

Gaya tulisan:
${style}

Buat deskripsi yang menarik dan cocok untuk toko online.

PENTING:
- Jangan mengarang spesifikasi yang tidak diberikan.
- Jangan membuat klaim kesehatan atau klaim berlebihan.
- Gunakan bahasa Indonesia yang natural.
`;

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      input: prompt
    });

    res.json({
      result: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Terjadi kesalahan saat menghubungi AI."
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`AIKita berjalan di port ${PORT}`);
});
