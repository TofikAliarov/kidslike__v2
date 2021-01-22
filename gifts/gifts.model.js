const mongoose = require("mongoose");
const { Schema } = mongoose;

const GIFT_PATH = `${process.env.DOMAIN_ADDRESS}/images/defGift.svg`;

const giftSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, default: GIFT_PATH },
    childId: { type: mongoose.ObjectId, required: false },
    // todo for ihor task add history of buy
    // userId: { type: mongoose.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

exports.GiftModel = mongoose.model("Gift", giftSchema);
