const PornHub = require('pornhub.js')
const pornhub = new PornHub()

class BotPorn {
  static videos(url) {
    pornhub.video(url).then((res) => {
      return res.data
    })
  }

  static album(url) {
    pornhub.album(url).then((res) => {
      return res.data
    })
  }

  static photo(url) {
    pornhub.photo(url).then((res) => {
      return res.data
    })
  }

  static search(type, keyword) {
    const query = {
      page: 1,
      order: 'Most Recent',
    }
    pornhub
      .search(type, keyword, query)
      .then((res) => {
        return res.data
      })
      .catch((e) => console.log(e))
  }
}

module.exports = BotPorn
