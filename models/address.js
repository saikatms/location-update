const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
});

mongoose.model("Address", addressSchema);
