const db = require("../connection")
const format = require("pg-format")
const { formatTopics, formatUsers, formatArticles, matchArticle, formatComments } = require('../utils/seed-utils')

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`
      DROP TABLE IF EXISTS comments;
      DROP TABLE IF EXISTS articles;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS topics;
      
      CREATE TABLE topics (
        slug VARCHAR (255) PRIMARY KEY,
        description VARCHAR (255),
        img_url VARCHAR (1000)
      );

      CREATE TABLE users (
        username VARCHAR (255) PRIMARY KEY,
        name VARCHAR (255) NOT NULL,
        avatar_url VARCHAR (1000)
      );

      CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR (255) NOT NULL,
      topic VARCHAR (255) REFERENCES topics (slug) NOT NULL,
      author VARCHAR (255) REFERENCES users (username) NOT NULL,
      body TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      votes INT DEFAULT 0,
      article_img_url VARCHAR (1000)
      );

      CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      article_id INT REFERENCES articles (article_id),
      body TEXT NOT NULL,
      votes INT DEFAULT 0,
      author VARCHAR (255) REFERENCES users(username) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      `
    )
    .then(() => {
      const insertTopics = format(`
        INSERT INTO topics (
          slug, 
          description, 
          img_url
        ) 
        VALUES 
          %L
        `,
        formatTopics(topicData)
      )

      const insertUsers = format(`
        INSERT INTO users (
          username, 
          name, 
          avatar_url
        ) 
        VALUES 
          %L
        `,
        formatUsers(userData)
      )

      return Promise.all([db.query(insertTopics), db.query(insertUsers)])
    })
    .then (() => {
      const insertArticles = format(`
        INSERT INTO articles (
          title, 
          topic, 
          author, 
          body, 
          created_at, 
          votes, 
          article_img_url
        ) 
        VALUES 
          %L 
        RETURNING 
          article_id, 
          title
        `,
        formatArticles(articleData)
      )

      return db.query(insertArticles)
    })
    .then ((articleResult) => {
      const articleInfo = articleResult.rows

      const insertComments = format(`
        INSERT INTO comments (
          article_id, 
          body, 
          votes, 
          author, 
          created_at
        ) 
        VALUES 
          %L
        `,
        formatComments(commentData, articleInfo)
      )

      return db.query(insertComments)
    })
};
module.exports = seed;
