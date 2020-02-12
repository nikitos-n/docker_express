const {Schema, model} = require("mongoose")

const course = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String
})

module.expotrs = model("Course", course)