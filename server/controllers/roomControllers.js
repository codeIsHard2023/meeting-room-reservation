const meetingRooms = require("../database/salles.json");

// Controller test
const testBrowse = (req, res, next) => {
  try {
    res.json({ message: "hello from router controller" });
  } catch (err) {
    next(err);
  }
};

// Here we get data from salles.json
const read = (req, res, next) => {
  try {
    res.json(meetingRooms);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  testBrowse,
  read,
};
