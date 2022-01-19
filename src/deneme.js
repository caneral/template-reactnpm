import axios from 'axios'
import jwtDefaultConfig from './constants/Storage'
import { storageGetItem, storageSetItem } from './utils/StorageHelpers'


export const jwtConfig = { ...jwtDefaultConfig }
export const login = (data) => {
    return axios.post(jwtConfig.loginEndpoint, data)
}

export const Interceptors = async () => {
    const accessToken = await storageGetItem(`${jwtConfig.storageTokenKeyName}`)
    const loginData = await storageGetItem('loginData')
    axios.interceptors.request.use(
        config => {
            if (accessToken) {
                config.headers.Authorization = `${jwtConfig.tokenType} ${accessToken}`
            }
            return config
        },
        error => Promise.reject(error)
    )

    // ** Add request/response interceptor
    axios.interceptors.response.use(
        response => response,
        error => {
            // if (error.response?.status === 401) {
            //     console.log("401 e düştüm")
            // }
            throw error;
        }
    )
}




