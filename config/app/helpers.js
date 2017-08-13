const getHashKey = (x, y) => String(x) + y


const generateField = ({fieldSize, cellCount, CELL, EMPTY_CELL}) => {
  const hash = {}
  const size = fieldSize
  const field = new Array(size).fill(0)

  field.forEach((e, i, a) => (field[i] = new Array(size).fill(0)))

  let i = 0
  while (i < cellCount) {
    const x = ~~(Math.random() * size)
    const y = ~~(Math.random() * size)
    const key = getHashKey(x, y)

    field[x][y] = CELL

    if (!(key in hash)) (hash[key] = EMPTY_CELL,  i++)

    // Infinite loop protection temporary
    if (i > 1250) break
  }

  return {field, hash}
}

module.exports.getHashKey = getHashKey 
module.exports.generateField = generateField