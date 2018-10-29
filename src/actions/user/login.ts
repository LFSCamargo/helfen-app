import { ENV } from '../../config/env'

interface UserLogin {
  email: string
  password: string
}

interface LoginReturn {
  error: boolean
  token?: string
  errorMessage?: string
}

export default async ({ email, password }: UserLogin): Promise<LoginReturn> => {
  const body = {
    email,
    password,
  }

  const OPTS = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const uri = `${ENV.API}/login`

  try {
    const data = await fetch(uri, OPTS)
    const json = await data.json()

    if (json.error) {
      return {
        error: true,
        errorMessage: json.message,
      }
    }

    return {
      error: false,
      token: json.token,
    }
  } catch (e) {
    return {
      error: true,
      errorMessage: e.message,
    }
  }
}
