const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Driver = mongoose.model("Drivers");
const DriverLocations = mongoose.model("DriverLocations");

router.get("/driver/:id", (req, res) => {
  Driver.findOne({ _id: req.params.id }, (err, driver) => {
    if (err) {
      res.send(err);
    }
    res.send(driver);
  });
});

router.post("/addDriver", (req, res) => {
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res.status(422).json({ error: "Plase add all the fields" });
  }
  const driver = new Driver({ firstName, lastName });
  driver
    .save()
    .then((result) => {
      console.log(result);
      res.json({ driver: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/allDrivers", (req, res) => {  
  Driver
    .find((err, bookings) => {
      if (err) {
        res.send(err);
      }
      res.json(bookings);
    });
  });

module.exports = router;
