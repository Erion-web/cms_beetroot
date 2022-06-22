const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "categories",
  },
  private: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("posts", PostSchema);
