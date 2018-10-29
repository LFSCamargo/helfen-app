import { User } from '../sagas/user/get'
import { GET_USER_FAIL, GET_USER_SUCCESS, GET_USER } from '../actions/user/get'

export interface UserState {
  user: User | null
  isLoading: boolean
  error: Error | null
}

interface UserAction {
  type: string
  error?: Error
  user?: User
}

const initialState = {
  user: null,
  isLoading: true,
  error: null,
}

const user = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case GET_USER_SUCCESS: {
      const { user } = action
      return {
        ...state,
        isLoading: false,
        user,
      }
    }
    case GET_USER_FAIL: {
      const { error } = action
      return {
        ...state,
        isLoading: false,
        error,
      }
    }
    default:
      return {
        ...state,
      }
  }
}

export default user
