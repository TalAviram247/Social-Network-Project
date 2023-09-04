const { Router } = require("express");
const { contactController } = require("../controllers/contact-controller");
const router = Router();

router.post("/", contactController.saveContactForm);

module.exports = router;
