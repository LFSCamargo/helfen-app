import { ENV } from '../../config/env'

export interface UserAdd {
  name: string
  password: string
  email: string
  cell: string
  document: string
}

interface SignUpReturn {
  error: boolean
  token?: string
  errorMessage?: string
}

const signup = async ({
  name,
  password,
  email,
  cell,
  document,
}: UserAdd): Promise<SignUpReturn> => {
  const body = {
    name,
    password,
    email,
    cell,
    document,
  }

  const OPTS = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const uri = `${ENV.API}/signup`

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

export default signup
