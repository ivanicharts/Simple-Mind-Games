import { call, put, takeLatest } from 'redux-saga/effects'

export function* fetchField (action) {
  try {
    const field = yield call(fetch, 'http://127.0.0.1:1337/field')
    yield put({type: 'FIELD_SUCCEEDED', field})
  } catch (error) {
    yield put({type: 'FETCH_FAILED', error})
  }
}

export function* watchFetchField () {
  yield takeLatest('FIELD_REQUESTED', fetchField)
}
