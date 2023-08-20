import CryptoData from '../model/Cripto.js'
import { CovalentApi } from '../api/covalentApi.js'

export const getCripto = async (req, res) => {
  try {
    const existingCryptoData = await CryptoData.findOne({ contractName:'Ether'})
    if (existingCryptoData) {
      const today = new Date();
      const existingDate = existingCryptoData.createdAt
      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth();
      const todayDay = today.getDate();
      const existingYear = existingDate.getFullYear();
      const existingMonth = existingDate.getMonth();
      const existingDay = existingDate.getDate();
      if (
        todayYear === existingYear &&
        todayMonth === existingMonth &&
        todayDay === existingDay
      ) {
        res.json(existingCryptoData)
      }else {
        const from = '2023-08-01'
        const to = '2023-08-20'
        const response = await CovalentApi.get(`/pricing/historical_by_addresses_v2/eth-mainnet/USD/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/?from=${from}&to=${to}`,{headers:{'Authorization': `${process.env.API_KEY}`}})
        const cryptoData = response.data
        const newCryptoData = new CryptoData({
          contractName: cryptoData.data[0].contract_name,
          logoUrl: cryptoData.data[0].logo_url,
          quoteCurrency: cryptoData.data[0].quote_currency,
          prices: cryptoData.data[0].prices.map(price => ({
            price: price.price,
            date: price.date
          }))
        })
        await newCryptoData.save()
        res.json(newCryptoData)
      }
    } else {
      const from = '2023-08-01'
      const to = '2023-08-20'
      const response = await CovalentApi.get(`/pricing/historical_by_addresses_v2/eth-mainnet/USD/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/?from=${from}&to=${to}`,{headers:{'Authorization': `${process.env.API_KEY}`}})
      const cryptoData = response.data
      const newCryptoData = new CryptoData({
        contractName: cryptoData.data[0].contract_name,
        logoUrl: cryptoData.data[0].logo_url,
        quoteCurrency: cryptoData.data[0].quote_currency,
        prices: cryptoData.data[0].prices.map(price => ({
          price: price.price,
          date: price.date
        }))
      })
      await newCryptoData.save()
      res.json(newCryptoData)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'problema al guardar los datos',})
  }
}
