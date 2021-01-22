const { ChildModel } = require("../childs/childs.model");
const { GiftModel } = require("./gifts.model");

const path = require("path");
const { deleteOldImage } = require("../helpers/image.upload");
require("dotenv").config({ path: path.join(__dirname, ".env") });

exports.getGifts = async (req, res, next) => {
  const { childId } = req.user;
  if (!childId.length) return res.status(200).send([]);

  const children = await ChildModel.find({ _id: childId.map((el) => el) });
  if (!children) return res.status(200).send([]);

  const gifts = await GiftModel.find({ childId: children.map((el) => el) });
  if (!gifts) return res.status(200).send([]);

  return res.status(200).send(gifts);
};

exports.getGiftById = async (req, res, next) => {
  return res.status(200).send(req.gift);
};

exports.createGift = async (req, res, next) => {
  const baseimageURL = `${process.env.DOMAIN_ADDRESS}/images/`;
  if (req.file) {
    const { filename } = req.file;
    const newImageURL = baseimageURL + filename;

    const newGift = await GiftModel.create({
      ...req.body,
      imageUrl: newImageURL,
    });
    return res.status(201).send(newGift);
  } else {
    const newGift = await GiftModel.create({ ...req.body });
    return res.status(201).send(newGift);
  }
};

exports.updateGift = async (req, res, next) => {
  const { _id } = req.gift;

  if (req.file) {
    const imageUrl = req.body.imageURL;
    const baseimageURL = `${process.env.DOMAIN_ADDRESS}/images/`;
    const { filename } = req.file;

    const newImageURL = baseimageURL + filename;
    const newData = { ...req.body, imageUrl: newImageURL };
    const updatedGift = await GiftModel.findByIdAndUpdate(_id, newData, {
      new: true,
    });
    const oldImageName = imageUrl.replace(baseimageURL, "");
    await deleteOldImage(oldImageName);
    if (!updatedGift) {
      return res.status(400).send("From update cotroler");
    }
    return res.status(200).send(updatedGift);
  } else {
    const updatedGift = await GiftModel.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    return res.status(200).send(updatedGift);
  }
};
exports.purchaseGift = async (req, res, next) => {
  const { childId, price } = req.body;
  const child = await ChildModel.findById(childId);
  if (child.points >= price) {
    const newTotal = child.points - price;
    await ChildModel.findByIdAndUpdate(childId, {
      $set: { points: newTotal },
      new: true,
    });
    const updatedChild = await ChildModel.findById(childId);
    return res.status(200).send(updatedChild);
  } else {
    res.status(404).send("You dont have enough points");
  }
};

exports.deleteGift = async (req, res, next) => {
  const { _id, imageUrl } = req.gift;
  const baseimageURL = `${process.env.DOMAIN_ADDRESS}/images/`;
  const imageName = imageUrl.replace(baseimageURL, "");
  if (imageName !== "defGif.png" && imageName !== "defGift.svg") {
    await deleteOldImage(imageName);
  }
  await GiftModel.findByIdAndDelete(_id);
  return res.status(204).send();
};
