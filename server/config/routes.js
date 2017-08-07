import { Router } from 'express'

import {MemoryMosaicCotroller} from '../src/memory-mosaic'

const routes = Router()

// Init routes
for (let ctrl in MemoryMosaicCotroller) {
  let {route, controller, method, middlewares=[]} = MemoryMosaicCotroller[ctrl]
  routes[method](route, ...middlewares, controller)
}

export default routes
