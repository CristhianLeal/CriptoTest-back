import axios from "axios";

export const CovalentApi = axios.create({
  baseURL:'https://api.covalenthq.com/v1',
  headers: {
    Authorization: 'Bearer cqt_rQxfHxWC7qXTwGdvBkF4gf3f3btV'
  }
})
