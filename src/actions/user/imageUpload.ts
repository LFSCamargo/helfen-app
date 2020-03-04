import RNFetchBlob from 'rn-fetch-blob'
import ImageResizer from 'react-native-image-resizer'
import { ENV } from '../../config/env'
import { AsyncStorage } from 'react-native'
import { User } from 'src/sagas/user/get'

interface ImageToBase64 {
  error: boolean
  image: string
  errorMessage: string | null
}

export const imageToBase64 = (uri: string): Promise<ImageToBase64> => {
  return new Promise((resolve, reject) => {
    ImageResizer.createResizedImage(uri, 500, 500, 'JPEG', 100, 0)
      .then(response => {
        RNFetchBlob.fetch('GET', response.uri)
          .then(res => {
            const base64FinalURI: string = `data:image/png;base64,${res.data}`
            resolve({
              error: false,
              image: base64FinalURI,
              errorMessage: null,
            })
          })
          .catch((e: Error) =>
            reject({
              error: true,
              image: null,
              errorMessage: e.message,
            }),
          )
      })
      .catch((e: Error) => {
        reject({
          error: true,
          image: null,
          errorMessage: e.message,
        })
      })
  })
}

interface UploadResponse {
  status: number
  message: string
  error: Error
}

interface ImageUpload {
  error: boolean
  message: string
}

export const imageToTheApi = async (base64: string): Promise<ImageUpload> => {
  const body = {
    photoURI: base64,
  }

  const token = (await AsyncStorage.getItem('token')) || ''

  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
    body: JSON.stringify(body),
  }

  try {
    const req = await fetch(`${ENV.API}/user/addPhoto`, opts)
    const json: UploadResponse = await req.json()

    if (json.error) {
      return {
        error: true,
        message: json.message,
      }
    }

    return {
      error: false,
      message: json.message,
    }
  } catch (error) {
    return {
      error: true,
      message: error.message,
    }
  }
}

export const UPDATE_IMAGE = 'UPDATE_IMAGE'

export const updateUserImage = (uri: string, user: User) => ({
  type: UPDATE_IMAGE,
  user,
  image: uri,
})
