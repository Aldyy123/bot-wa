const brainly = require('brainly-scraper')

const searchBrainly = (questions) => {
    brainly(questions).then(res => {
        return res.success ? res.data : ''
    })
}

module.exports = searchBrainly
