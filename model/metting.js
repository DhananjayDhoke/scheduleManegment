const mongoose = require("mongoose");

const MettingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    roomId: {
        type: String,
        required: true,
    },
})

const Meeting = mongoose.model("Metting", MettingSchema);

module.exports = Meeting;