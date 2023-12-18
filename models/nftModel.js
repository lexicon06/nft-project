import mongoose from "mongoose";

const nftSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      unique: true,
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Provide a duration"],
    },

    maxGroupSize: {
      type: Number,
      required: [true, "Provide a maxGroupSize"],
    },
    difficulty: {
      type: String,
      required: [true, "Please enter a difficulty"],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true, "Please enter a price"],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, "Please enter a summary"],
    },
    description: {
      type: String,
    },
    imageCover: {
      type: String,
      required: [true, "Please enter a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
  },
  {
    timestamps: true,
  }
);

const NFT = mongoose.model("NFT", nftSchema);

export default NFT;
