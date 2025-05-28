const mongoose = require("mongoose")

const studentSchema = mongoose.Schema ({
    rollno : String,
    name : String,
    degree : String,
    city : String
})

module.exports = mongoose.model('Student',studentSchema)
