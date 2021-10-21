const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const driverSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    //   dob: {
    //     type: String,
    //     required: true,
    //   },
    //   rating: {
    //     type: String,
    //     required: true,
    //   },
    //   email: {
    //     type: String,
    //     required: true,
    //   },
  },
  { timestamps: true }
);

mongoose.model("Drivers", driverSchema);
