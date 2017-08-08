import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware, { END } from 'redux-saga'

import rootReducer from 'reducers'

export default function configureStore(initialState) {
  const sagaMiddlware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        sagaMiddlware,
        createLogger()
      )
    )
  )

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      () => store.replaceReducer(require('../reducers').default)
    )
  }
  store.runSaga = sagaMiddlware.runSaga
  store.close = () => store.dispatch(END)
  return store
}
