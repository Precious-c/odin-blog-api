const express = require("express")
const router = express.Router()
// const upload = require("../middleware/multer")
const upload = require("../middleware/cloudinary")
const postController = require("../controllers/postcontroller")
const isAuth = require("../middleware/isAuth")

// router.get("/", postController.getPosts)
router.get("/posts/", isAuth, postController.getPosts)
router.post("/posts/", upload.single("postImage"), isAuth, postController.newPost)
router.get("/posts/published", postController.getPublished)
router.put("/posts/unpublish/:id", isAuth, postController.unpublishPost)
router.put("/posts/publish/:id", isAuth, postController.publishPost)
router.get("/posts/:id", postController.getOnePost)
router.put("/posts/:id", isAuth, postController.updateOnePost)
router.delete("/posts/:id", isAuth, postController.deleteOnePost)

//comments
router.get("/posts/:id/comments", postController.getComments);
router.post("/posts/:id/comment", postController.newComment);

module.exports = router;