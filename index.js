const { create, Client } = require('@open-wa/wa-automate')
const handleMsg = require('./msg')
var rootCas = require('ssl-root-cas').create()
const https = require('https')

function start(bot = new Client()) {
  // Jika bot di masukan ke group
  bot.onAddedToGroup((chat) => {
    // Jika member group full
    if (chat.participantsCount >= 256) {
      bot.getGroupAdmins(chat.id).then((admins) => {
        admins.map((admin) => {
          bot.sendText(admin, 'Gak bisa masuk, full groupnya\n By Bot')
        })
      })
    } else {
      // Sapaan ketika baru masuk group
      bot.sendText(chat.id, 'Assalamualaikum semuanya eak')
    }
  })

  // Bot di keluarkan dari group
  bot.onRemovedFromGroup((chat) => {
    console.log('Remove Group', chat)
    bot.sendText()
  })
  bot.onStory((chat) => {
    console.log('story', chat)
  })
  bot.onMessage((chat) => {
    handleMsg(bot, chat)
  })
}

https.globalAgent.options.ca = rootCas


// Create Session
create()
  .then((client) => start(client))
  .catch((err) => new Error(err))
