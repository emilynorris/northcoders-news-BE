const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');
const { formatTopics, formatUsers, formatArticles, matchArticle, formatComments } = require('../db/utils/seed-utils')

beforeAll(() => seed(data));
afterAll(() => db.end());

describe('seed utils', () => {
  describe('formatTopics', () => {
    test('returns array of arrays', () => {
      expect(Array.isArray(formatTopics(data.topicData))).toBe(true)
      formatTopics(data.topicData).forEach((element) => 
      expect(Array.isArray(element)).toBe(true))
    });
    test('correct number of topics returned', () => {
      expect(formatTopics(data.topicData)).toHaveLength(data.topicData.length)
    })
    test('contains expected data in correct order', () => {
      const formattedTopics = formatTopics(data.topicData)

      expect(formattedTopics[0]).toEqual([
        data.topicData[0].slug,
        data.topicData[0].description,
        data.topicData[0].img_url
      ])
    })
  })
  describe('formatUsers', () => {
    test('returns array of arrays', () => {
      expect(Array.isArray(formatUsers(data.userData))).toBe(true)
      formatUsers(data.userData).forEach((element) => 
      expect(Array.isArray(element)).toBe(true))
    });
    test('correct number of users returned', () => {
      expect(formatUsers(data.userData)).toHaveLength(data.userData.length)
    })
    test('contains expected data in correct order', () => {
      const formattedUsers = formatUsers(data.userData)

      expect(formattedUsers[0]).toEqual([
        data.userData[0].username,
        data.userData[0].name,
        data.userData[0].avatar_url
      ])
    })
  })
  describe('formatArticles', () => {
    test('returns array of arrays', () => {
      expect(Array.isArray(formatArticles(data.articleData))).toBe(true)
      formatArticles(data.articleData).forEach((element) => 
      expect(Array.isArray(element)).toBe(true))
    });
    test('correct number of articles returned', () => {
      expect(formatArticles(data.articleData)).toHaveLength(data.articleData.length)
    })
    test('contains expected data in correct order', () => {
      const formattedArticles = formatArticles(data.articleData)

      expect(formattedArticles[0]).toEqual([
        data.articleData[0].title,
        data.articleData[0].topic,
        data.articleData[0].author,
        data.articleData[0].body,
        data.articleData[0].created_at,
        data.articleData[0].votes,
        data.articleData[0].article_img_url
      ])
    })
  })
  describe('matchArticle', () => {
    test('returns the matching article_id based on title', () => {
    const articleInfo = [
      { article_id: 1, title: 'A' },
      { article_id: 2, title: 'B' },
    ]

    const commentData = [
      { article_title: 'A', body: 'hi', votes: 0, author: 'butter_bridge', created_at: '2020-01-01' },
      { article_title: 'B', body: 'yo', votes: 5, author: 'icellusedkars', created_at: '2020-01-02' },
    ]
    
    const comment = { article_title: 'B' } 

    expect(matchArticle(articleInfo, comment)).toBe(2)
    });
  })
  describe('formatComments', () => {
    const articleInfo = [
    { article_id: 1, title: 'A' },
    { article_id: 2, title: 'B' },
    ]

    const commentData = [
      { article_title: 'A', body: 'hi', votes: 0, author: 'butter_bridge', created_at: '2020-01-01' },
      { article_title: 'B', body: 'yo', votes: 5, author: 'icellusedkars', created_at: '2020-01-02' },
    ]

      test('returns array of arrays', () => {
        expect(Array.isArray(formatComments(commentData, articleInfo))).toBe(true)
        formatComments(commentData, articleInfo).forEach((element) => 
        expect(Array.isArray(element)).toBe(true))
      });
      test('correct number of comments returned', () => {
        expect(formatComments(commentData, articleInfo)).toHaveLength(2)
      })
      test('contains expected data in correct order', () => {
        const formattedComments = formatComments(commentData, articleInfo)

        expect(formattedComments[0]).toEqual([
          1,
          'hi',
          0,
          'butter_bridge',
          '2020-01-01'
        ])
      })
  })
});