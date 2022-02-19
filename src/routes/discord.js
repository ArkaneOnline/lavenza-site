const router = require("express").Router();
const inviteURL = "https://discord.gg/YCAsHmy";

router.get("/", (req, res) => {
    res.redirect(inviteURL);
})

module.exports = router;