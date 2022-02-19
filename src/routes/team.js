const router = require("express").Router();

router.get("/", (req, res) => {
    if(req.user){
        res.render("team", {
            username: req.user.username,
            icon: req.user.icon,
            discordId: req.user.discordId
        });
    } else {
        res.render("team");
    }
})

module.exports = router;