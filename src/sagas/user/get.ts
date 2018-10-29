import { AsyncStorage } from 'react-native'
import { put, takeEvery } from 'redux-saga/effects'

import { GET_USER, GET_USER_FAIL, GET_USER_SUCCESS } from '../../actions/user/get'
import { ENV } from '../../config/env'

export interface User {
  _id: string
  active: boolean
  name: string
  email: string
  cell: string
  document: string
  photo: string
}

function* getUser() {
  try {
    const token = yield AsyncStorage.getItem('token')

    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({}),
    }

    const req = yield fetch(`${ENV.API}/me`, opts)
    const user: Promise<User> = yield req.json()

    yield put({
      type: GET_USER_SUCCESS,
      user,
    })
  } catch (error) {
    yield put({
      type: GET_USER_FAIL,
      error,
    })
  }
}

const f = function*() {
  yield takeEvery(GET_USER, getUser)
}

export default f
