const express = require("express")
const app = express()
const {getAllTopics} = require ("./controllers/topics.controllers")
const { getAllArticles , getArticlesById } = require ("./controllers/articles.controllers")
const {getAllUsers} = require("./controllers/users.controllers")


app.use("/api", express.static('public', {index: "index.html"}))
app.use(express.json())

//topics
app.get("/api/topics", getAllTopics)

//articles
app.get("/api/articles", getAllArticles)
app.get("/api/articles/:article_id", getArticlesById)

//users
app.get("/api/users", getAllUsers)

module.exports = app