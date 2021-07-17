const axios = require('axios')

const cekIp = async () => {
    try {
        const ip = await axios.get('https://api.ipify.org?format=json')
        return ip.data.ip
    } catch (error) {
        console.log(error);
    }
}

module.exports = cekIp