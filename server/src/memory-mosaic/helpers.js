import {
  WIN_CELL, WRONG_CELL, CELL,
  CELL_COUNT, FIELD_SIZE, EMPTY_CELL, MS
} from './../../../src/memory-mosaic/constants'

export const getHashKey = (x, y) => String(x) + y

export const generateField = ({fieldSize, cellCount}) => {
  const hash = {}
  const size = fieldSize
  const field = new Array(size).fill(0)
  const CELL = 1
  const EMPTY_CELL = 0

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

  return field
}
