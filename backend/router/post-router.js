const { Router } = require("express");
const { postController } = require("../controllers/post-controller");
const { requireAuth } = require("../middleware/auth-middleware");
const router = Router();

router.get("/", requireAuth, postController.getAllPosts);
router.get("/like/:postId", requireAuth, postController.likePost);
router.post("/", requireAuth, postController.addPost);
router.delete("/:postId", requireAuth, postController.deletePost);

module.exports = router;
