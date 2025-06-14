const express = require("express")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Student = require("./model/Student")

const path = require('path')
const app = express()
const port = 5000

mongoose.connect("mongodb://localhost:27017/studentDB")

app.set('view engine' , 'ejs')
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, 'public')))

app.get("/",async(req,res) => {
    const students = await Student.find()
    res.render('index',{students})
})

app.post('/save', async(req,res) => {
    const {rollno, name, degree, city} = req.body
    const students = new Student({rollno, name, degree, city})
    await students.save()
    res.redirect('/')
})

app.post('/delete/:id', async(req, res)=> {
    const studentID = req.params.id
    await Student.findByIdAndDelete(studentID.trim())
    res.redirect('/')
})

app.post('/update/:id', async (req, res) => {
    const { rollno, name, degree, city } = req.body;
    await Student.findByIdAndUpdate(req.params.id, { rollno, name, degree, city });
    res.redirect('/');
});

app.listen((port),() =>{console.log(`server running on :${port}`)} )



