const mongoose = require("mongoose");

module.exports = mongoose.connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});