function convertAbbreviatedNum(abbreviation) {
  const number = parseFloat(abbreviation.substr(0, abbreviation.length-1))
  const unit = abbreviation.substr(-1)
  const zeros = { k:1e3, M:1e6, G:1e9, T:1e12 } // k: thousand, M: million, G: billion, T: trillion

  return !zeros[unit] ? parseFloat(abbreviation) : number*zeros[unit]
}
module.exports = convertAbbreviatedNum