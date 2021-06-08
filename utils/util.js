function search(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].title === nameKey) {
      return myArray[i]
    }
  }
}

function capitalize(string) {
  const sentence = string.toLowerCase().split(' ')
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
  }
  const text = sentence.join(' ').toString()
  return text
}


module.exports = {
  search,
  capitalize
}
