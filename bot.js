const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const bodyParser = require('body-parser');

const token = '7608346779:AAE_R82sELbfCJKd48bTlgXUQJ08g5y4bLM';
const GAME_URL = 'https://game.yudiz.com/dragon-force/';

const bot = new Telegraf(token);
const app = express();
const port = 3024;

app.use(bodyParser.json());

// Handle /start command with referral
bot.command('start', async (ctx) => {
  try {
    // Get the referral code from the start command if it exists
    const startPayload = ctx.message.text.split(' ')[1];

    // Construct the game URL with the referral code using the new format
    const gameUrl = startPayload
      ? `${GAME_URL}?tgWebAppStartParam=${startPayload}`
      : GAME_URL;

    await ctx.replyWithMarkdown(
      `*Dragon Force*\n\n` +
      `🚀 Command your dragon through space!\n` +
      `🎮 Blast obstacles and dodge debris.\n` +
      `⚡ Drag to maneuver and stay focused.\n` +
      `🏆 Survive as long as you can!\n` +
      `🌌 Conquer the perilous void of space.`,
      Markup.inlineKeyboard([
        Markup.button.webApp('START', gameUrl)
      ])
    );
  } catch (error) {
    console.error('Error in start command:', error);
    ctx.reply('Sorry, something went wrong. Please try again.');
  }
});

// Webhook route for Telegram
app.post(`/bot${token}`, (req, res) => {
  bot.handleUpdate(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Set up webhook
const url = 'https://telegrams4.game.webdevprojects.cloud/bot' + token;
bot.telegram.setWebhook(url);