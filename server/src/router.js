const express = require("express");
const router = express.Router();

/* ************* Import controllers modules ************* */

const roomControllers = require("../controllers/roomControllers");
/* ************************************************ */

/* ************* Routes definitions ************* */

router.get("/check-status-router", roomControllers.testBrowse);
router.get("/all-rooms", roomControllers.read);
router.get("/all-reservations", roomControllers.readReservations);
router.post("/post-reservation", roomControllers.add);
/* ************************************************ */
module.exports = router;
