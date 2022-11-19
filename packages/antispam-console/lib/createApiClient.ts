import axios from 'axios'

export const createApiClient = () => {
  return axios.create({ withCredentials: true })
}
