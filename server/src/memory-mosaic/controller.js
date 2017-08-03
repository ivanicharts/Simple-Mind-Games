import { GET } from '../../constants/methods'
import config, { levels } from '../../../src/config/memory-mosaic.json'
import state from './state'

import {
  WIN_CELL, WRONG_CELL, CELL,
  CELL_COUNT, FIELD_SIZE, EMPTY_CELL, MS
} from './../../../src/memory-mosaic/constants'

export const getHashKey = (x, y) => String(x) + y

export default {
  getAll: {
    method: GET,
    route: '/',
    controller(req, res) {
      res.send('OOk')
    }
  },

  getNewField: {
    method: GET,
    route: '/field',
    controller(req, res) {
      const {currentLevel} = state
      const hash = {}
      const size = levels[currentLevel][FIELD_SIZE]
      const field = new Array(size).fill(0)
      const cellCount = levels[currentLevel][CELL_COUNT]

      field.forEach((e, i, a) => (field[i] = new Array(size).fill(0)))

      let i = 0
      while (i < cellCount) {
        const x = ~~(Math.random() * size)
        const y = ~~(Math.random() * size)
        const key = getHashKey(x, y)

        field[x][y] = CELL

        if (!(key in hash)) (hash[key] = EMPTY_CELL,  i++)

        // Infinite loop protection temporary
        if (i > 250) break
      }

      // this.setState({field, hash, visible: true, guessedCells: 0, ready: true})
      // setTimeout(() => this.setState({ready: false}), config.preloadTime * MS + 100)
      // setTimeout(() => this.setState({visible: false}), config.preloadTime * MS + config.visibleTime * MS)

      res.send(field)
    }
  },

}
