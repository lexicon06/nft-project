import mongoose from "mongoose";

const nftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Plase enter a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "Please enter a price"],
  },
});

const NFT = mongoose.model("NFT", nftSchema);

export default NFT;
