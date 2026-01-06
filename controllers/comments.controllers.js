const { fetchArticleCommentsById , insertComment } = require ("../models/comments.models")

function getArticleCommentsById (req,res,next) {
    const { article_id } = req.params
    fetchArticleCommentsById(article_id).then((comments) => {
        res.status(200).send({comments})
    })
}

function postComment (req,res,next) {
    const { article_id } = req.params
    const { username, body } = req.body

    insertComment(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
}

module.exports = { getArticleCommentsById , postComment }