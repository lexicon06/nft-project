import mongoose from "mongoose";

const userNftSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Provide a email address"],
    },

    role: {
      type: String,
      required: [true, "Provide a flag for role"],
    },
    active: {
      type: Boolean,
      required: [true, "Please enter the status"],
    },
    photo: {
      type: String,
      required: [true, "Please enter a photo"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
  },
  {
    timestamps: true,
  }
);

const userNFT = mongoose.model("userNFT", userNftSchema);

export default userNFT;
