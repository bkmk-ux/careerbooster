const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    fullName: String,
    email: String,
    phone: String,
    skills: [String],
    education: [String],
    experience: [String],
    summary: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("CV", cvSchema);
