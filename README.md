# NC News

## Summary
Fully populated database with RESTful server for NC News site.

In this back end project:
1. Test and development databases will be seeded
2. A database connection file will be set up
3. Connection to test and development databases will be possible using .env files

TDD will be used. 

<!-- ## Hosted link -->

## Getting started
### Installing dependencies
1. To prevent committing broken code, this project uses Git hooks via Husky. Run ```npm install``` to enable Husky.
2. In order to safely create dynamic SQL queries, the pg-format is required. Run ```npm install pg-format``` to install.

### Creating the databases
**Run the setup script**
-To create both databases, run ```npm run setup-dbs```

**Set up environment variables**
-Create .env.development file. In order to connect locally populate with *PGDATABASE = development_database_name*
-Create .env.test file. In order to connect locally populate with *PGDATABASE = test_database_name*

**Verify setup**
-Run ```npm run test-seed``` to test seed function
-Run ```npm run seed-dev``` to call seed function with development data