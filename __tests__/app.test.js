const request = require("supertest")
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data/index')
const app = require("../app.js")
const db = require('../db/connection')

beforeEach (() => seed(data))
afterAll(() => db.end())

//topics
describe('GET /api/topics', () => {
  test('GET: 200 - responds with array of objects containing all topics', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then (({body}) => {
        expect(body).toHaveProperty("topics")
        expect(body.topics).toHaveLength(data.topicData.length)
        expect(Array.isArray(body.topics)).toBe(true)
        body.topics.forEach((topic) => {
          expect(typeof topic).toBe("object")
        })
      })
    })
    test('GET: 200 - responds with expected properties with correct data types', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then (({body}) => {
        body.topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug", expect.any(String))
          expect(topic).toHaveProperty("description", expect.any(String))
        })
      })
    })
  })

  //articles
describe('/api/articles', () => {
  test('GET: 200 - responds with array of objects for all articles' , () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then (({body}) => {
        expect(body).toHaveProperty("articles")
        expect(body.articles).toHaveLength(data.articleData.length)
        expect(Array.isArray(body.articles)).toBe(true)
        body.articles.forEach((article) => {
          expect(typeof article).toBe("object")
        })
      })
  })
  test('GET: 200 - responds with expected properties with correct data types', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then (({body}) => {
        body.articles.forEach((article) => {
          expect(article).toHaveProperty("author", expect.any(String))
          expect(article).toHaveProperty("title", expect.any(String))
          expect(article).toHaveProperty("article_id", expect.any(Number))
          expect(article).toHaveProperty("topic", expect.any(String))
          expect(article).toHaveProperty("created_at", expect.any(String))
          expect(article).toHaveProperty("votes", expect.any(Number))
          expect(article).toHaveProperty("article_img_url", expect.any(String))
          expect(article).toHaveProperty("comment_count", expect.any(Number))

          expect(article).not.toHaveProperty("body")
        })
      })
  })
  test('GET: 200 - responds with articles sorted by created_at date in desc order', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then (({body}) => {
        for (let i = 0; i < body.articles.length - 1; i++) {
          const current = new Date(body.articles[i].created_at)
          const next = new Date(body.articles[i + 1].created_at)

          expect(current >= next).toBe(true)
        }
      })
  })
})

describe ('GET /api/articles/:article_id', () => {
  test('GET: 200 - responds with article filtered by article_id', () => {
    return request(app)
        .get('/api/articles/5')
        .expect(200)
        .then (({body}) => {
          expect(body).toHaveProperty("article")
          expect(typeof body.article).toBe ("object")
        })
  })
  test('GET: 200 - responds with expected properties with correct data types', () => {
    return request(app)
      .get('/api/articles/3')
      .expect(200)
      .then (({body}) => {
        expect(body.article).toHaveProperty("author", expect.any(String))
        expect(body.article).toHaveProperty("title", expect.any(String))
        expect(body.article).toHaveProperty("article_id", expect.any(Number))
        expect(body.article).toHaveProperty("body", expect.any(String))
        expect(body.article).toHaveProperty("topic", expect.any(String))
        expect(body.article).toHaveProperty("created_at", expect.any(String))
        expect(body.article).toHaveProperty("votes", expect.any(Number))
        expect(body.article).toHaveProperty("article_img_url", expect.any(String))

        expect(body.article).not.toHaveProperty("comment_count")
      })
  })
})

describe ('GET /api/articles/:article_id/comments', () => {
  test('GET: 200 - responds with all comments for an article filtered by article_id', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then (({body}) => {
        body.comments.forEach((comment) => {
          expect(comment.article_id).toBe(1)
        })
        expect(body).toHaveProperty("comments")
        expect(Array.isArray(body.comments)).toBe(true)
        body.comments.forEach((comment) => {
          expect(typeof comment).toBe("object")
        })
      })   
  })
  test('GET: 200 - responds with expected properties with correct data types', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then (({body}) => {
        body.comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id", expect.any(Number))
          expect(comment).toHaveProperty("votes", expect.any(Number))
          expect(comment).toHaveProperty("created_at", expect.any(String))
          expect(comment).toHaveProperty("author", expect.any(String))
          expect(comment).toHaveProperty("body", expect.any(String))
          expect(comment).toHaveProperty("article_id", expect.any(Number))
        })
      })
  })
  test('GET: 200 - responds with articles sorted by created_at date in desc order', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then (({body}) => {
        for (let i = 0; i < body.comments.length - 1; i++) {
          const current = new Date(body.comments[i].created_at)
          const next = new Date(body.comments[i + 1].created_at)

          expect(current >= next).toBe(true)
        }
      })
  })
}) 

describe ('POST /api/articles/:article_id/comments', () => {
  test('responds with posted comment', () => {
    return request(app)
      .post('/api/articles/1/comments')
      .send({
        username:"rogersop", 
        body:"Comment test"
      })
      .expect(201)
      .then (({body}) => {
        expect(body.comment).toMatchObject ({
          comment_id: expect.any(Number),
          author: "rogersop",
          body: "Comment test",
          article_id: 1,
          votes: 0,
          created_at: expect.any(String)
        })
      })  
  })
})

//users
describe ('GET /api/users', () => {
  test('GET: 200 - responds with array of objects containing all users', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then (({body}) => {
        expect(body).toHaveProperty("users")
        expect(body.users).toHaveLength(data.userData.length)
        expect(Array.isArray(body.users)).toBe(true)
        body.users.forEach((user) => {
          expect(typeof user).toBe("object")
        })
      })
  })
  test('GET: 200 - responds with expected properties with correct data types', () => {
  return request(app)
    .get('/api/users')
    .expect(200)
    .then (({body}) => {
      body.users.forEach((user) => {
        expect(user).toHaveProperty("username", expect.any(String))
        expect(user).toHaveProperty("name", expect.any(String))
        expect(user).toHaveProperty("avatar_url", expect.any(String))
      })
    })
  })
})

