const TelegramBot = require('node-telegram-bot-api');

// আপনার দেওয়া তথ্য
const token = '8826662349:AAHygIfBZ9xIOeP2sy5AC5yZ05RyaBo9aaU';
const adminId = 5918033066;

const bot = new TelegramBot(token, { polling: true });

// মেইন মেনু কিবোর্ড
const mainMenu = {
    reply_markup: {
        keyboard: [
            [{ text: '☎️ GET NUMBER' }, { text: '🟢 LIVE SYSTEM' }],
            [{ text: '💳 WALLET' }, { text: '💸 Withdraw' }]
        ],
        resize_keyboard: true
    }
};

// /start কমান্ড
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeText = `✨ **Number Bot** ✨\n🚀 Get OTP Numbers\n🌐 FB | WA | Google\n🔒 Auto OTP Forward\n💰 Earn per OTP\n👉 Use buttons below`;
    
    bot.sendMessage(chatId, welcomeText, {
        parse_mode: 'Markdown',
        ...mainMenu
    });
});

// বাটন হ্যান্ডলিং
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '☎️ GET NUMBER') {
        const opts = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Facebook', callback_data: 'service_fb' }],
                    [{ text: 'WhatsApp', callback_data: 'service_wa' }],
                    [{ text: 'Google', callback_data: 'service_gg' }]
                ]
            }
        };
        bot.sendMessage(chatId, "Select a Service:", opts);
    }

    if (text === '🟢 LIVE SYSTEM') {
        const status = `📊 **Live Traffic (Last 60 min)**\n\n🇵🇪 Peru 67.7%\n🇲🇲 Myanmar 32.3%\n\nBy Service: Facebook 100%`;
        bot.sendMessage(chatId, status, { parse_mode: 'Markdown' });
    }

    if (text === '💳 WALLET') {
        const walletMsg = `💰 **Your Wallet**\n\n💵 Balance: $0.0000 (~৳0.00)\n👥 Referrals: 0\n🎁 Referral Earnings: $0.0000\n🚀 Withdraw to cash out`;
        bot.sendMessage(chatId, walletMsg, { parse_mode: 'Markdown' });
    }

    if (text === '💸 Withdraw') {
        bot.sendMessage(chatId, "❌ Withdrawals are currently disabled by admin.");
    }
});

// অ্যাডমিন প্যানেল (/admin)
bot.onText(/\/admin/, (msg) => {
    const chatId = msg.chat.id;
    if (chatId === adminId) {
        bot.sendMessage(chatId, "Welcome Admin! You can control the bot from here.");
    } else {
        bot.sendMessage(chatId, "You are not authorized to use this command.");
    }
});

console.log("Bot is running...");
