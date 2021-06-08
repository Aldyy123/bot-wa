const axios = require('axios')
const url = 'https://islamic-api-indonesia.herokuapp.com'
const { search, capitalize } = require('../utils/util')

const ayatKursi = async () => {
  try {
    const api = await axios.get(`${url}/api/data/json/ayatkursi`)
    const data = await api.data.result.data
    // arabic, latin, tafsir
    return data
  } catch (error) {
    return new Error(error)
  }
}

const Wirid = async () => {
  try {
    const api = await axios.get(`${url}/api/data/json/wirid`)
    const datas = await api.data.result.data
    // [ {arabic, times} ]
    return datas
  } catch (error) {
    return new Error(error)
  }
}

const doaHarian = async (key) => {
  try {
    const api = await axios.get(`${url}/api/data/json/doaharian`)
    const datas = await api.data.result.data
    const title = await capitalize(key)
    const result = await search(title, datas)
    return result
  } catch (error) {
    return new Error(error)
  }
}

const niatSholat = async () => {
  try {
    const api = await axios.get(`${url}/api/data/json/niatshalat`)
    const datas = await api.data.result
    // datas =  [name, arabic, latin, terjemahan]
    return datas
  } catch (error) {
    return new Error(error)
  }
}

const nabiStory = async (nameNabi) => {
  try {
    //   Name nabi harus kecil
    const api = await axios.get(
      `${url}/api/data/kisahnabi?nabi=${nameNabi.toLowerCase()}`,
    )
    const data = await api.data
    if (data.status) {
      // nabi, lahir, umur, tempat, image, kisah
      return data.result.nabi
    }
  } catch (error) {
    return await new Error(error)
  }
}

const searchHadist = async (kitab, number) => {
  try {
    const api = await axios.get(
      `${url}/api/data/hadith?kitab=${kitab}&nomor=${number}`,
    )
    const data = await api.data.result
    if (data.error) {
      return
    } else {
      if (data.data.contents !== undefined) return
      // data.data = {name, id}
      // data.data.contents = {number, arab, id}
      return data.data
    }
  } catch (error) {
    return await new Error(error)
  }
}

const searchSurah = async (noSurah) => {
  try {
    let api = await axios.get(`${url}/api/data/quran?surah=${noSurah}&ayat=1}`)
    const result = await api.data.result

    if (data.code === 404) {
      return
    } else {
      const totalAyat = result.data.surah.numberOfVerses
      //   Agar semua ayat bisa di dengarkan
      for (let i = 1; i <= totalAyat; i++) {
        api = await axios.get(
          `${url}/api/data/quran?surah=${noSurah}&ayat=${i}`,
        )
        // return audio
        return api.data.result.data.audio.primary
      }
    }
  } catch (error) {
    return await new Error(error)
  }
}

const jadwalSholat = async (kota) => {
  try {
      const api = await axios.get(`${url}/api/data/jadwalshalat?kota=${kota}`)
      const results = await api.data.result
      return results
  } catch (error) {
      return await new Error(error)
  }
}

module.exports = {
    ayatKursi,
    Wirid,
    doaHarian,
    niatSholat,
    nabiStory,
    searchHadist,
    searchSurah,
    jadwalSholat
}