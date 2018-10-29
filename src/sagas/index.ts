import { fork } from 'redux-saga/effects'

import get from './user/get'

export default function* root() {
  yield fork(get)
}
