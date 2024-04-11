const express = require("express");
const router = express.Router();

/* ************* Import controllers modules ************* */

const testControllers = require("../controllers/testControllers");
/* ************************************************ */

/* ************* Routes definitions ************* */

router.get("/check-status-router", testControllers.testBrowse);
router.get("/test-all-rooms", testControllers.testReadAll);
/* ************************************************ */
module.exports = router;
