const { Schema, model } = require("mongoose");

const tarea = new Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "usuario",
    },
    createdAT: {
        type: Date,
        default: Date.now(),
    },
})

module.exports =  model("Tarea", tarea);