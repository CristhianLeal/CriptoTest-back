import { model, Schema } from 'mongoose'

const PricesCriptoSchema = new Schema({
  price: {
    type: String,
    required: [true, 'El Precio es requerido']
  },
  date: {
    type: String,
    required: [true, 'La fecha es requerida']
  }
}, { _id: false })

const CryptoDataSchema = new Schema(
  {
    contractName: {
      type: String,
      required: [true, 'El Nombre es requerido']
    },
    logoUrl: {
      type: String,
      required: [true, 'El link del logo es requerido']
    },
    quoteCurrency: {
      type: String,
      required: [true, 'La moneda es requerida']
    },
    prices: [PricesCriptoSchema]

  },
  {
    timestamps: true
  }
)

export default model('CryptoData', CryptoDataSchema)