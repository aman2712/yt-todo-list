import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Item = new mongoose.model("Item", itemSchema);
export default Item;
