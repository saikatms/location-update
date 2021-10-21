const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const driverLocationsSchema = new mongoose.Schema({
  driverId: {
    type: ObjectId,
    ref: "Drivers",
  },
  // username:String,
  // text:String,
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
    },
    coordinates: [],
  },
  socketId: {
    type: String,
    required: true,
  }
},
  {
    timestamps:true
  }

);
driverLocationsSchema.index({location:"2dsphere"})
mongoose.model("DriverLocations", driverLocationsSchema);
