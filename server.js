import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static("public")); // HTML joylashgan joy
app.use(express.json());

// 🔹 Telegram WebApp’dan yuborilgan userID ni olib, foydalanuvchi ma’lumotini qaytaradi
app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const token = process.env.BOT_TOKEN;

  try {
    // Telegramdan foydalanuvchi ma’lumotlarini olish
    const response = await fetch(`https://api.telegram.org/bot${token}/getUserProfilePhotos?user_id=${userId}`);
    const data = await response.json();

    if (data.ok && data.result.total_count > 0) {
      const fileId = data.result.photos[0][0].file_id;

      // Telegram file API orqali rasm manzilini olish
      const fileRes = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`);
      const fileData = await fileRes.json();

      const filePath = fileData.result.file_path;
      const photoUrl = `https://api.telegram.org/file/bot${token}/${filePath}`;

      res.json({ ok: true, photoUrl });
    } else {
      res.json({ ok: false, message: "Rasm topilmadi" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Server xatosi" });
  }
});

// 🔹 Serverni ishga tushiramiz
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server ${PORT}-portda ishlamoqda`));
