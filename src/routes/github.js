const router = require("express").Router();

router.get("/", (req, res) => {
    res.redirect("https://github.com/ArkaneOnline/lavenza");
})

module.exports = router;