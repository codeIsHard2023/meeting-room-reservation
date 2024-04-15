const express = require("express");
const router = express.Router();

/* ************* Import controllers modules ************* */

const roomControllers = require("../controllers/roomControllers");
/* ************************************************ */

/* ************* Routes definitions ************* */

router.get("/check-status-router", roomControllers.testBrowse);
router.get("/rooms", roomControllers.read);
router.get("/reservations", roomControllers.readReservations);
router.get("/reservations/:room/:date", roomControllers.findReservations);
router.post("/post-reservation", roomControllers.add);
/* ************************************************ */
module.exports = router;
