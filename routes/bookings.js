const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Bookings = mongoose.model("Bookings");

router.get("/bookings", function (req, res, next) {
  Bookings.find((err, bookings) => {
    if (err) {
      res.send(err);
    }
    res.json(bookings);
  });
});
router.post("/bookings", (req, res, next) => {
  const { username, pickUp, dropOff, status } = req.body;
  const nearByDriver = req.body.nearByDriver;

  if (!username) {
    res.status(400);
    res.json({
      error: "Bad Data",
    });
  } else {
    const booking = new Bookings({
      username,
      pickUp,
      dropOff,
      status,
    });
    booking
      .save()
      .then((result) => {
        // console.log(result);
        res.json({ booking: result });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

module.exports = router;
