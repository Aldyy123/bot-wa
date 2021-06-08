const fs = require('fs');

// Import All libraries
const {
  jadwalSholat,
  ayatKursi,
  Wirid,
  doaHarian,
  niatSholat,
  nabiStory,
} = require('./libs/islamicapi')
const BotPorn = require('./libs/pornhub')

// Import Json
const { prefix } = require('./setting/setting.json')

module.exports = async function handleMsg(bot, msg) {
  // Parameter Message
  const {
    body,
    id,
    type,
    t,
    from,
    to,
    chatId,
    timestamp,
    isOnline,
    caption,
  } = msg

  //================================== Bot prefix =================================================================
  const pesanText =
    type === 'chat' && body.startsWith(prefix)
      ? body
      : (type === 'image' || type === 'video') &&
        caption &&
        caption.startsWith(prefix)
      ? caption
      : ''

  const arguments = (type === 'image' || type === 'video')? caption.trim().split(' ') : (body.trim() !== undefined)? body.trim().split(' ') : body.split(' ') 
  const arg1 = arguments[1]
  const arg2 = arguments[2]
  const arg3 = arguments[3]
  const command = arguments[0].toLowerCase().substring(1)
  let text = ''

  //============================ Command for running bot =============================================================
  switch (command) {
    case 'jadwalsholat':
      const results = await jadwalSholat(arg1)
      const timeDay = new Date().getDate() - 1
      if (results === undefined) {
        await bot.reply(chatId, `Gak Ada kota ${arg1}`, id)
      } else {
        const {
          tanggal,
          imsyak,
          dhuha,
          dhuhur,
          ashar,
          maghrib,
          isya,
        } = results[timeDay]
        text = `
        Jadwal di kota ${arg1}
        Tanggal ${tanggal}\n
        Imsyak : ${imsyak}\n
        Dhuha : ${dhuha}\n
        Dhuhur : ${dhuhur}\n
        Ashar : ${ashar}\n
        Maghrib : ${maghrib}\n
        Isya : ${isya}`
        await bot.reply(chatId, text, id)
      }
      break

    case 'ayatkursi':
      const ayatkursi = await ayatKursi()
      text = `${ayatkursi.arabic}\n
      ${ayatkursi.latin}`
      await bot.reply(chatId, text, id)
      break

    case 'wirid':
      const wirid = await Wirid()
      wirid.map(async (bacaan) => {
        text = `yang ke ${bacaan.id}
        ${bacaan.arabic}\n
        Di baca ${bacaan.times}X`
        await bot.reply(chatId, text, id)
      })
      break

    case 'doaharian':
      const doaharian = await doaHarian(
        arguments.splice(1).toString().replace(/,/g, ' '),
      )

      if (doaharian === undefined) {
        await bot.reply(chatId, 'Doa yang kamu cari gak ada', id)
      } else {
        text = `${doaharian.title}\n
        ${doaharian.arabic}\n
        ${doaharian.latin}\n
        ${doaharian.translations}\n`
        await bot.reply(chatId, text, id)
      }

      break

    case 'niatsholat':
      const items = await niatSholat()
      items.map(async (item) => {
        text = `${item.name}\n
        ${item.arabic}\n
        ${item.latin}\n
        ${item.terjemahan}`
        await bot.reply(chatId, text, id)
      })
      break

    case 'ceritanabi':
      const nabi = await nabiStory(arg1)
      if (nabi != undefined) {
        text = `${nabi.image}
      Nabi ${nabi.nabi}\n
      Lahir : ${nabi.lahir}\n
      ${nabi.kisah}`
        await bot.reply(chatId, text, id)
      } else {
        await bot.reply(chatId, 'Gk ada ngab', id)
      }
      break

    case 'searchporn':
      const keywordPorn = `${arg2 + ' ' + arg3}`
      console.log(keywordPorn)
      const result = await BotPorn.search(arg1, keywordPorn)
      console.log(result)
      break

    case 'bro':
      await bot.reply(chatId, 'Apa', id)
      break

    case 'stc':
      console.log(body);
      await bot.sendImageAsStickerAsReply(chatId, body, id)
      break

    default:
      await bot.sendText(chatId, 'Tolong yang spesifik ya cok')
      break
  }
}