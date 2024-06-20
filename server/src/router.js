const express = require("express");
const router = express.Router();

/* ************* Import controllers modules ************* */

const roomControllers = require("../controllers/roomControllers");
const reservationControllers = require("../controllers/reservationControllers");
/* ************************************************ */

/* ************* Routes definitions ************* */

router.get("/rooms", roomControllers.read);
router.get(
  "/reservations/:room/:date",
  reservationControllers.findReservations
);
router.post("/post-reservation", reservationControllers.create);
router.get("/reservations", reservationControllers.readReservations); // unused
/* ************************************************ */
module.exports = router;
