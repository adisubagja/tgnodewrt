import { Telegraf } from "telegraf"
import 'dotenv/config'

import modeminfo from "./command/modeminfo.js";
import my_ip from "./command/my_ip.js";
import bash_cmd from "./command/bash_cmd.js";
import speedtest from "./command/speedtest.js";
import SystemHandler from "./command/system.js"
import speedtest_log from "./command/speedtest_log.js"
import vnstat from "./command/vnstat.js"
import tts from "./command/tts.js"
import { isAdmin } from "./lib/helper.js";



const bot = new Telegraf(process.env.TOKEN)

bot.telegram.getMe().then((bot_informations) => {
    bot.options.username = bot_informations.username;
    console.log("Server has initialized bot nickname. Nick: " + bot_informations.username);
});


bot.use(isAdmin)

bot.command('ping', (ctx) => {
    const start = ctx.update.message.date * 1000
    const end = new Date().getTime()
    const total_time = (end - start) / 1000
    ctx.reply(`📍 <b>Bot response time <code>${total_time.toFixed(2)}s</code></b>`, { reply_to_message_id: ctx.message.message_id, parse_mode: 'HTML' });
})

bot.use(SystemHandler)
bot.command('modeminfo', modeminfo)
bot.command('my_ip', my_ip)
bot.command('speedtest', speedtest)
bot.command('speedtest_log', speedtest_log)
bot.hears(/^.bash (.+)/i, bash_cmd)
bot.use(vnstat)
bot.use(tts)

bot.launch()