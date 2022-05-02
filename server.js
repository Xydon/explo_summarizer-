const { json } = require("express");
const express = require("express");
const fs = require("fs");
const path = require('path')
const cors = require('cors')
const spawn = require('child_process').spawn

const app = express(); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(cors()); 
app.use(express.urlencoded({extended : false}))
app.use(express.json()) 

app.post('/api/summarize/:type', (req, res) => {
    const text = req.body.text; 
    const type = req.params.type; 
    console.log(type) 
    console.log("processing text");
    let pythonProcess = spawn('python', [path.join(__dirname, 'code', 'router.py'), '"' + text + '"', type]); 
    pythonProcess.stdout.on('data', data => {
        console.log("processing done"); 
        data = data.toString(); 
        pythonProcess.kill()
        res.status(201).json({data}) 
    }); 
})

app.listen(5000); 
console.log("server started");