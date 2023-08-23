import CryptoData from '../model/Cripto.js'
import { CovalentApi } from '../api/covalentApi.js'

export const getCripto = async (req, res) => {
  try {
    const requestData = req.body
    let contractName = ''
    let ContactAdress = ''
    if (requestData.cripto === 'eth-mainnet') {
      contractName = 'Ether'
      ContactAdress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    }
    if (requestData.cripto === 'matic-mainnet') {
      contractName = 'Matic Token'
      ContactAdress = '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'
    }
    const existingCryptoData = await CryptoData.findOne({ contractName: `${contractName}`, quoteCurrency: `${requestData.quoteCurrency}` })
    if (existingCryptoData) {
      const maxDateStorage = existingCryptoData.prices[0].date
      const minDateStorage = existingCryptoData.prices[existingCryptoData.prices.length - 1].date
      if (requestData.dateFrom > minDateStorage && requestData.dateTo < maxDateStorage) {
        res.json(existingCryptoData)
      } else {
        await CryptoData.findByIdAndDelete(existingCryptoData._id)
        const response = await CovalentApi.get(`/pricing/historical_by_addresses_v2/${requestData.cripto}/${requestData.quoteCurrency}/${ContactAdress}/?from=${requestData.dateFrom}&to=${requestData.dateTo}`, { headers: { Authorization: `${process.env.API_KEY}` } })
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
      const response = await CovalentApi.get(`/pricing/historical_by_addresses_v2/${requestData.cripto}/${requestData.quoteCurrency}/${ContactAdress}/?from=${requestData.dateFrom}&to=${requestData.dateTo}`, { headers: { Authorization: `${process.env.API_KEY}` } })
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
    res.status(500).json({ message: 'problema al guardar los datos' })
  }
}
export const getInfoCripto = async (req, res) => {
  const cripto = req.params.cripto
  const quoteCurrency = req.params.quoteCurrency
  const existingCryptoData = await CryptoData.findOne({ contractName: `${cripto}`, quoteCurrency: `${quoteCurrency}` })
  res.json(existingCryptoData)
}
