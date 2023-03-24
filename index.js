
const express = require("express");
const mongoose = require("mongoose");
const { SchedulMetting } = require("./controller/meetingcontroller");
//8GAW9gfWl6Zki3bb


const app = express();

app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb+srv://dhananjaydhoke3:8GAW9gfWl6Zki3bb@cluster0.7bgpavx.mongodb.net/?retryWrites=true&w=majority")
}

// controller logic 

app.post("api/v1.0.1/schedule", SchedulMetting)

app.listen(8088, async () => {
    try {

        await connect();
        console.log("listing on port")

    } catch (error) {
        console.log(error)
    }
})