const { Router } = require("express");
const userController = require("../controllers/user-controller");
const { requireAuth, requireAdmin } = require("../middleware/auth-middleware");
const router = Router();

router.get("/", requireAuth, userController.getAllUsers);
router.get("/follow/:username", requireAuth, userController.followUser);
router.get("/logout", requireAuth, userController.logout);
router.get("/refresh", requireAuth, userController.refresh);
router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.delete("/:username", requireAdmin, userController.deleteUser);

module.exports = router;
