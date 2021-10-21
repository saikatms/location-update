const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const bookingSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    pickUp: {
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
    },
    dropOff: {
      //   type: ObjectId,
      //   ref: "Address",
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
    },
    status: {
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

mongoose.model("Bookings", bookingSchema);
