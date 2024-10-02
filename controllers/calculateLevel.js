function calculateLevel(xp) {
  const difficulty = 100
  const startingLvl = 1
  const level = ~~(Math.log2(xp/difficulty+1))+startingLvl
  const nextLvlXp = difficulty*((2**level)-startingLvl)

  return { current:{ level: level, xp: xp }, next:{ level: level+1, xp: nextLvlXp }, toNextLevel: nextLvlXp-xp }
}
module.exports = calculateLevel