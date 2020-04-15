const express = require("express")
const app = express()
const path = require("path")
app.use(express.json())



app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "documents/index.html"))

app.get("/styles.css", (req, res) =>{
    res.sendFile(path.join(__dirname, "documents/css/styles.css"))
    })
})

const route_crud = require("./routes/crud")
app.use(route_crud)

const port = 3000
app.listen(port, () =>{
    console.log("Corriendo server")
})