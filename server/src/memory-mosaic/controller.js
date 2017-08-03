import { GET } from '../../constants/methods'
import config, { levels } from '../../../config/app/memory-mosaic.json'
import state from './state'
import { generateField } from './helpers'

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

      const newField = generateField(levels[11])
      // this.setState({field, hash, visible: true, guessedCells: 0, ready: true})
      // setTimeout(() => this.setState({ready: false}), config.preloadTime * MS + 100)
      // setTimeout(() => this.setState({visible: false}), config.preloadTime * MS + config.visibleTime * MS)

      res.send(newField)
    }
  },

}
