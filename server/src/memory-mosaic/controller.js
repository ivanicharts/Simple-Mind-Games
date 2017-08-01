import { GET } from '../../constants/methods'

export default {
  getAll: {
    method: GET,
    route: '/',
    controller(req, res) {
      res.send('OOk')
    }
  },

  getField: {
    method: GET,
    route: '/field',
    controller(req, res) {
      res.send('brand new field!')
    }
  },

}
