import CryptoData from '../model/Cripto.js'
import { CovalentApi } from '../api/covalentApi.js'

export const getCripto = async (req, res) => {
  try {
    const response = await CovalentApi.get('/pricing/historical_by_addresses_v2/eth-mainnet/USD/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/?from=2023-08-08&to=2023-08-18')
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
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'problema al guardar los datos',})
  }
}
