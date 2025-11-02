import 'dotenv/config';
import { Telegraf, Markup } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  const user = ctx.from.first_name || "foydalanuvchi";

  const message = `
👋 Salom, ${user}!
🍋 <b>BANANA CASH</b> ga xush kelibsiz!

🤯 Pul ishlashning <b>zamonaviy Telegram avlodi</b> sizni kutmoqda.
💳 Qulay to‘ldirish — hech qanday murakkabliksiz!
💰 Tezkor to‘lovlar — daqiqalar ichida balansda!
👥 Ro‘yxatdan o‘tish shart emas — shunchaki “O‘ynash” tugmasini bosing!
👨‍💻 24/7 yordam — doimo siz bilan!
  `;

  ctx.reply(message, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [
        Markup.button.url('📢 Telegram kanal', 'https://t.me/banana_cash_community'),
        Markup.button.callback('🎮 O‘ynash', 'play')
      ]
    ])
  });
});

bot.action('play', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('🎯 O‘yin boshlanmoqda... (bu yerda keyingi qadamni qo‘shamiz)');
});

bot.launch();
console.log("🚀 Banana Cash bot ishga tushdi!");
