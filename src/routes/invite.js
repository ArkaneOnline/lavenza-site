const router = require("express").Router();
const inviteURL = "https://discord.com/api/oauth2/authorize?client_id=639988194229878810&permissions=8&scope=bot%20applications.commands";

router.get("/", (req, res) => {
    if(req.user){
        res.redirect(inviteURL);
    } else {
        res.redirect("/auth");
    }
})

module.exports = router;