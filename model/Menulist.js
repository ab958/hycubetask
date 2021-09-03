const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const menuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    //   unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    //   default: false,
    },
  },
  {
    timestamps: true,
  }
);
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const menu = mongoose.model("Menu", menuSchema);
module.exports = menu;
