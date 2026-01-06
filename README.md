# NC News

## Summary
Fully populated database with RESTful server for NC News site.

In this back end project:
1. Test and development databases will be seeded
2. A database connection file will be set up
3. Connection to test and development databases will be possible using .env files

TDD will be used. 

## Hosted link
https://northcoders-news-ihiu.onrender.com/

## Tech Stack
- Node.js
- Express
- PostgreSQL
- Supabase
- Render

## Getting started
### Installing dependencies
1. To prevent committing broken code, this project uses Git hooks via Husky. Run ```npm install``` to enable Husky.
2. In order to safely create dynamic SQL queries, the pg-format is required. Run ```npm install pg-format``` to install.
3. Express is used for server creation and endpoint creation. Run ```npm install express``` to install.
4. In order to test API endpoints, Supertest is required. SuperTest should be installed as a dev dependency using ```npm i -D supertest```. It should then be required or imported at the top of the relevant .test.js file as request, along with the Express app that is being tested.

### Creating the databases
**Set up environment variables**
To run this project locally, you will need the following environment variables:

-.env.development file populated with *PGDATABASE = development_database_name*
-.env.test file populated with *PGDATABASE = test_database_name*
-.env.production file popluated with *DATABASE_URL = transaction_pooler_URI_connection_string_from_Supabase*

**Run the setup script**
-To create test and development databases, run ```npm run setup-dbs```

**Verify setup**
-Run ```npm run seed-test``` to test seed function
-Run ```npm run seed``` to call seed function with development data