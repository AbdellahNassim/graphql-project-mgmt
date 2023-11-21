import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Client", clientSchema);
