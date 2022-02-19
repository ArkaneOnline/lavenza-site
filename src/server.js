//dotenv
require("dotenv").config();

//packages
const express = require("express");
const server = express();
const port = process.env.port || 3001;
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const discordStrategy = require("./strategies/discordStrategy");
const db = require("./database/database");
const path = require("path");
const mongooese = require("mongoose");

//database
db.then(() => console.log("Connected to MongoDB")).catch(err => console.log(err));

//routes
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
const githubRoute = require("./routes/github");
const discordRoute = require("./routes/discord");
const teamRoute = require("./routes/team");
const supportRoute = require("./routes/support");


//session
server.use(session({
    secret: "lavenzaSecret",
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    resave: false,
    name: "lavenza.discordoauth",
    store: new MongoStore({ mongooseConnection: mongooese.connection })
}));

//view engine
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));
server.use(express.static(path.join(__dirname, "public")));

//passport
server.use(passport.initialize());
server.use(passport.session());

//middleware
server.use("/auth", authRoute);
server.use("/profile", profileRoute);
server.use("/github", githubRoute);
server.use("/discord", discordRoute);
server.use("/team", teamRoute);
server.use("/support", supportRoute);

server.get("/", (req, res) => {
    if(req.user){
        res.render("home", {
            username: req.user.username,
            icon: req.user.icon,
            discordId: req.user.discordId
        });
    } else {
        res.render("home");
    }
});

server.listen(port, () => {
    console.log(`Now listening to requests on port: ${port}`);
});

