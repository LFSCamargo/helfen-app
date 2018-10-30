import { User } from '../sagas/user/get'
import { GET_USER_FAIL, GET_USER_SUCCESS, GET_USER } from '../actions/user/get'
import { UPDATE_IMAGE } from '../actions/user/imageUpload'

export interface UserState {
  user: User | null
  isLoading: boolean
  error: Error | null
}

interface UserAction {
  type: string
  error: Error
  user: User
  image: string
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
    case UPDATE_IMAGE: {
      const { user, image } = action
      return {
        ...state,
        user: {
          _id: user._id,
          active: user.active,
          name: user.name,
          email: user.email,
          cell: user.cell,
          document: user.document,
          photo: image,
        },
      }
    }
    default:
      return {
        ...state,
      }
  }
}

export default user
