const axios = require('axios')

const header = () => {
 return {
  'x-rapidapi-key': 'dd3f776146mshdd0944a2ff7ceb9p1a4815jsn7a5467fa00d4',
  'x-rapidapi-host': 'love-calculator.p.rapidapi.com'
 }
}

const loveCalculator = async (fname, sname) => {
 try {
  const api = await axios.get(
   `https://love-calculator.p.rapidapi.com/getPercentage?fname=${fname}&sname=${sname}`,
   {
    header: header(),
   }
  )
  return api.data
 } catch (error) {
  console.log(error)
 }
}

module.exports = loveCalculator