import { AsyncStorage } from 'react-native'
import { ENV } from '../../config/env'

export interface Pet {
  name: string
  address: string
  type: string
  obs: string
  photo: string
}

export const addLostPet = async ({ name, address, type, obs, photo }: Pet) => {
  const body = {
    name,
    address,
    type,
    obs,
    photo,
  }

  const token = await AsyncStorage.getItem('token')

  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token || '',
    },
    body: JSON.stringify(body),
  }

  try {
    const req = await fetch(`${ENV.API}/addPet`, opts)
    const res = await req.json()

    if (res.error) {
      return {
        error: true,
        errorMessage: res.message,
      }
    }

    return {
      error: false,
    }
  } catch (e) {
    return {
      error: true,
      errorMessage: e.message,
    }
  }
}
