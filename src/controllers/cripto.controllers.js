import CryptoData from '../model/Cripto.js'
import { CovalentApi } from '../api/covalentApi.js'
import { coinsData } from '../helpers/coinsData.js'
import { cryptoDataInstance } from '../helpers/cryptoDataInstace.js'

export const getCripto = async (req, res) => {
  try {
    const requestData = req.body
    const criptoData = coinsData[requestData.cripto]
    const existCryptoData = await CryptoData.findOne({ contractName: criptoData.contractName, quoteCurrency: requestData.quoteCurrency })
    if (existCryptoData) {
      const maxDateStorage = new Date(existCryptoData.prices[0].date)
      const minDateStorage = new Date(existCryptoData.prices[existCryptoData.prices.length - 1].date)
      const requestdateFrom = new Date(requestData.dateFrom)
      const requestDataTo = new Date(requestData.dateTo)
      if (requestdateFrom >= minDateStorage && requestDataTo <= maxDateStorage) {
        return res.json(existCryptoData)
      } else {
        const response = await CovalentApi.get(`/pricing/historical_by_addresses_v2/${requestData.cripto}/${requestData.quoteCurrency}/${criptoData.ContactAdress}/?from=${requestData.dateFrom}&to=${requestData.dateTo}`, { headers: { Authorization: `${process.env.API_KEY}` } })
        const newCryptoData = cryptoDataInstance(response.data.data[0])
        const newPrices = response.data.data[0].prices.map(price => ({
          price: price.price,
          date: price.date
        }))
        try {
          await CryptoData.findByIdAndUpdate(existCryptoData._id, { $set: { prices: newPrices } }, { new: true })
        } catch (error) {
          return res.status(500).json({ message: 'problema al actualizar los datos' })
        }
        res.json(newCryptoData)
      }
    } else {
      const response = await CovalentApi.get(`/pricing/historical_by_addresses_v2/${requestData.cripto}/${requestData.quoteCurrency}/${criptoData.ContactAdress}/?from=${requestData.dateFrom}&to=${requestData.dateTo}`, { headers: { Authorization: `${process.env.API_KEY}` } })
      const newCryptoData = cryptoDataInstance(response.data.data[0])
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
  const dataFound = await CryptoData.findOne({ contractName: `${cripto}`, quoteCurrency: `${quoteCurrency}` })
  res.json(dataFound)
}
