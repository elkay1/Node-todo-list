const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: "Name cannot be blank"
    },
    complete: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

let Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;