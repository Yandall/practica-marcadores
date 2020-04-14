const express = require("express")
const app = express()
app.use(express.json())


app.get("/", (req, res) =>{
    res.send("<h1>Hello World!</h1>")
})

const route_crud = require("./routes/crud")
app.use(route_crud)

const port = 3000
app.listen(port, () =>{
    console.log("Corriendo server")
})