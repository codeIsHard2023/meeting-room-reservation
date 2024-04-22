const express = require("express");
const router = express.Router();

/* ************* Import controllers modules ************* */

const roomControllers = require("../controllers/roomControllers");
const reservationControllers = require("../controllers/reservationControllers");
/* ************************************************ */

/* ************* Routes definitions ************* */

router.get("/check-status-router", roomControllers.testBrowse);
router.get("/rooms", roomControllers.read);
router.get("/reservations", reservationControllers.readReservations);
router.get(
  "/reservations/:room/:date",
  reservationControllers.findReservations
);
router.post("/post-reservation", reservationControllers.create);
/* ************************************************ */
module.exports = router;
