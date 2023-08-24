import axios from 'axios'

export const CovalentApi = axios.create({
  baseURL: 'https://api.covalenthq.com/v1'
})
