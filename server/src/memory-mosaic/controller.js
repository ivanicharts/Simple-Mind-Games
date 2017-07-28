import { GET } from '../../constants/methods'

export default {
  getAll: {
    method: GET,
    route: '/',
    controller(req, res) {
      res.send('OOk')
    }
  },

}
