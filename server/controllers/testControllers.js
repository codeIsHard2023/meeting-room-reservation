// Test json file import
const meetingRooms = require("../database/salles.json");

// Controller test
const testBrowse = (req, res, next) => {
  try {
    res.json({ message: "hello from router controller" });
  } catch (err) {
    next(err);
  }
};

// Test Salles.json
const testReadAll = (req, res, next) => {
  try {
    res.json(meetingRooms);
  } catch (err) {
    next(err);
  }
};

module.exports = { testBrowse, testReadAll };
