const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const DiscordUser = require("../models/DiscordUser");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await DiscordUser.findById(id);
    if (user) done(null, user);
});

passport.use(new DiscordStrategy({
    clientID: process.env.discord_client_id,
    clientSecret: process.env.discord_client_secret,
    callbackURL: process.env.discord_client_callback,
    scope: ["identify", "guilds"]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await DiscordUser.findOne({ discordId: profile.id });
        if (user) {
            done(null, user);
        } else {
            const newUser = await DiscordUser.create({
                discordId: profile.id,
                username: profile.username,
                icon: profile.avatar
            });
            const savedUser = await newUser.save();
            done(null, savedUser);
        }
    } catch (err) {
        console.log(err);
        done(err, null)
    }
}));