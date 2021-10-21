const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const DriverLocation = mongoose.model("DriverLocations");

//get nearby drivers
router.get("/driverLocation", (req, res) => {
  // console.log(parseFloat(req.body.latitude));
  // DriverLocation.ensureIndexes({ coordinate: "2dsphere" });
//  console.log();
  const longitude=req.body.longitude
  const latitude=req.body.latitude

  DriverLocation.find(
    {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    },
    (err, location) => {
      if (err) {
        // console.log(err);
        res.send(err);
      } else {
        res.send(location);
      }
    }
  );

});



router.post("/addDriverLocation", function (req, res, next) {
  var locationInp=new DriverLocation({
    driverId:"61433fcf929af7d13469cd63",
    // username:"Hiii",
    // text:"hello world",
    location:{
      type:"Point",
      coordinates:[
        -130.110492,
        36.098948        
      ]
    },
    socketId:"guKaaBTvcyr0m98mAAAB"
  });
  locationInp.save((err,msg)=>{
    if (err) {
      console.log(err);
      res.send(err)
    }
    res.send(msg)
  })
  // DriverLocation.find((err, bookings) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   res.json(bookings);
  // });
});



//update driver socket id
router.put("/driverLocationSocket/:id", (req, res) => {
  var io = req.app.io;
  if (!req.body) {
    res.status(400);
    res.json({
      error: "Bad data",
    });
  } else {
    DriverLocation.updateOne(
      { _id: req.params.id },
      { $set: { socketId: req.body.socketId } },
      (err, updateDetails) => {
        if (err) {
          res.send(err);
        } else {
          res.send(updateDetails);
        }
      }
    );
  }
});

//Update Location by driver to user
router.put("/driverLocation/:id", (req, res) => {
  var io = req.app.io;
  var location = req.body;
  var latitude = parseFloat(location.latitude);
  var longitude = parseFloat(location.longitude);

  if (!location) {
    res.status(400);
    res.json({
      error: "Bad Data",
    });
  } else {
    DriverLocation.updateOne(
      { _id: req.params.id },
      {
        $set: {
          socketId: location.socketId,
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        },
      },
      (err, updateDetails) => {
        if (err) {
          console.log(updateDetails);
          res.send(err);
        }
        if (updateDetails) {
          console.log(updateDetails);
          //Get updated location
          DriverLocation.findOne(
            {
              _id: req.params.id,
            },
            (error, updateLocation) => {
              if (error) {
                res.send(error);
              }
              res.send(updateLocation);
            }
          );
        }
      }
    );
  }
});

module.exports = router;
