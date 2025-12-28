function formatTopics (topicData) {
    return topicData.map((topic) => [
        topic.slug, 
        topic.description, 
        topic.img_url
    ])
}

function formatUsers (userData) {
    return userData.map((user) => [
        user.username, 
        user.name, 
        user.avatar_url
    ])
}

function formatArticles (articleData) {
    return articleData.map((article) => [
        article.title,
        article.topic,
        article.author,
        article.body,
        article.created_at,
        article.votes,
        article.article_img_url,
    ])
}

function matchArticle (articleInfo, comment) {
    const { article_id } = articleInfo.find((info) => {
        return info.title === comment.article_title
})

    return article_id
}

function formatComments (commentData, articleInfo) {
    return commentData.map((comment) => [
        matchArticle(articleInfo, comment),
        comment.body,
        comment.votes,
        comment.author,
        comment.created_at,
        ])
}

module.exports = { formatTopics, formatUsers, formatArticles, matchArticle, formatComments }