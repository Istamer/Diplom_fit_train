const Router = require('express')
const UserFeedback = require("../database/models/UserFeedback");
const User = require("../database/models/User");
const authMiddleware = require('../middlewaree/auth');
const router = new Router();


router.get("/", async (req, res) => {
    try {
        let reviews = await UserFeedback.find({}).sort({ createdAt: -1 });
        reviews = await Promise.all(reviews.map(async (post) => {
            const userName = await User.findById(post.userId).select("name");
            return { ...post._doc, name: userName.name };
        }));
        res.status(200).send({ reviews });
    } catch (error) {
        res.status(500).send("Server error");
    }
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { id } = req.user;
        const { text } = req.body;
        //const userMsg = await UserFeedback.findOne({ userId: id });
        // if (userMsg) {
        //     return res.status(401).send({ status: "failed", msg: "Ви вже залишили свій відгук" });
        // }
        const newMsg = UserFeedback.create({ userId: id, text: text, })
        res.status(201).send({ status: "done", newElement: newMsg });
    } catch (error) {
        res.status(500).send({ msr: "Server error" });
    }
});

router.put("/like/:postId", authMiddleware, async (req, res) => {
    console.log(req.body)
    try {
        const { id } = req.user;
        const { postId } = req.params;

        const likedPost = await UserFeedback.findById(postId);
        if (!likedPost) {
            return res.status(404).send({ msg: "post not found" });
        }

        if (!likedPost.like.includes(id)) {
            likedPost.like.push(id);
        }
        else {
            likedPost.like = likedPost.like.filter((userId) => userId !== id);
        }

        await likedPost.save();

        res.send({ msg: "Post liked successfully", data: likedPost });

    } catch (e) {
        console.log(e);
        res.status(500).send("Server error");
    }
});


module.exports = router;