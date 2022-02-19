const router = require("express").Router();

router.get("/", (req, res) => {
    if(req.user){
        res.render("profile", {
            username: req.user.username,
            icon: req.user.icon,
            discordId: req.user.discordId
        });
    } else {
        res.redirect("/auth");
    }
})

module.exports = router;