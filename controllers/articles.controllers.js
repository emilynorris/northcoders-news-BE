const { fetchAllArticles , fetchArticlesById } = require ("../models/articles.models")

function getAllArticles (req,res) {
    fetchAllArticles().then((articles) => {
        res.status(200).send({articles})
    }).catch((err) => {
    next(err)
  })
}

function getArticlesById (req,res,next) {
  const { article_id } = req.params
  fetchArticlesById(article_id).then((article) => {
    res.status(200).send({article})
  })
  .catch((err) => {
    next(err)
  })
}

module.exports = { getAllArticles , getArticlesById }