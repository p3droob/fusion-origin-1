function abbreviateNumber(number, precision=2) {
  const suffsFromZeros = { 0:'', 3:'k', 6:'M', 9:'G', 12:'T' }
  const { length } = number.toString()
  const lengthThird = length%3
  const divDigits = length-(lengthThird || lengthThird+3)
  const calc = ''+(number/(10**divDigits)).toFixed(precision)

  return number < 1000 ? ''+number : (calc.indexOf('.') === calc.length-3 ? calc.replace(/\.00/, '') : calc)+suffsFromZeros[divDigits]
}
module.exports = abbreviateNumber;
