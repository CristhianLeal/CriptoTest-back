import CryptoData from '../model/Cripto.js'
export const cryptoDataInstance = (cryptoData) => {
  return new CryptoData({
    contractName: cryptoData.contract_name,
    logoUrl: cryptoData.logo_url,
    quoteCurrency: cryptoData.quote_currency,
    prices: cryptoData.prices.map(price => ({
      price: price.price,
      date: price.date
    }))
  })
}
