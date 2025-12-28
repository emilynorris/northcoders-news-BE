const express = require("express")
const app = express()

app.use("/api", express.static('public', {index: "index.html"}))
app.use(express.json())