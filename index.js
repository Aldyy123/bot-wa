const { create, Client } = require('@open-wa/wa-automate')
const handleMsg = require('./msg')

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

  // Detect bot logout
  bot.onStateChanged(async state=>{
    console.log('statechanged', state)
    if(state==="CONFLICT" || state==="UNLAUNCHED") client.forceRefocus();

    if(state==='UNPAIRED') {
      console.log('LOGGED OUT!!!!')
      await bot.kill()
    }  
  });

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
const launchConfig = {
  useChrome: true,
  autoRefresh:true,
  cacheEnabled:false,
  qrTimeout: 30,
  authTimeout: 30,
  qrRefreshS: 30
};

// Create Session
create(launchConfig)
  .then((client) => start(client))
  .catch((err) => new Error(err))
