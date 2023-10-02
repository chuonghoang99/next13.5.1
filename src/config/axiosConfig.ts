import axios from 'axios'
import queryString from 'query-string'
import { getCmsToken } from './token'

const UAA_BASE = 'https://gateway.dev.apuscorp.com'
const API_UAA_REFRESH_TOKEN = '/oauth/login'

export const requestAuth = axios.create({
  baseURL: UAA_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'vi',
  },
  paramsSerializer: {
    serialize: (params: any) =>
      queryString.stringify(params, { arrayFormat: 'comma' }),
  },
})

export const middlewareRequest = async (config: any) => {
  let temp = {
    ...config,
    headers: {
      ...config?.headers,
      'Accept-Language': 'vi',
    },
  }
  if (config?.disableToken) {
    return temp
  }
  const tokenAccess: any = JSON.parse(getCmsToken() ?? '{}')

  if (config.url === API_UAA_REFRESH_TOKEN) {
    return temp
  }
  if (tokenAccess?.accessToken) {
    return {
      ...temp,
      headers: {
        ...temp.headers,
        Authorization: `Bearer ${tokenAccess?.accessToken}`,
      },
    }
  }
  return temp
}

export const middlewareResponse = (response: any) => {
  try {
    return response
  } catch (err) {
    console.log('err', err)
  }
}

let isRefreshing = false
let subscribers: any = []

export const middlewareResponseError = async (error: any) => {
  const {
    config,
    response: { status, data },
  } = error
  const originalRequest = config

  return Promise.reject(error)
}

requestAuth.interceptors.request.use(middlewareRequest, (error: any) =>
  Promise.reject(error)
)

requestAuth.interceptors.response.use(
  middlewareResponse,
  middlewareResponseError
)
