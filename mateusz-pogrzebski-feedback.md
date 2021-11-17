# BE Northcoders NC News Portfolio Check List

- Tests need to be explanded upon and organised a bit better.
- Excellent app structure: routers, controllers, models all well written using good names, in logical files.
- Single items of data (article, comment) need to be sent back as an object not array.

## Readme - Remove the one that was provided and write your own

- [x] Link to hosted version
- [x] Write a summary of what the project is
- [x] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [x] Include information about how to create `.env.test` and `.env.development` files
- [x] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

## General

- [ ] Remove any unnecessary `console.logs` and comments
- [ ] Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.)
- [x] .gitignore the `.env` files

## Connection to db

- [x] Throw error if `process.env.PGDATABASE` is not set

## Creating tables

- [x] Use `NOT NULL` on required fields
  - Could throw in a NOT NULL on the foreign keys but PSQL will give you an error anyway I think.
- [x] Default `created_at` in articles and comments tables to the current date:`TIMESTAMP DEFAULT NOW()`
- [x] Delete all comments when the article they are related to is deleted: Add `ON DELETE CASCADE` to `article_id` column in `comments` table.

## Inserting data

- [x] Make sure util functions do not mutate data
- [x] Make util functions easy to follow with well named functions and variables
  - Functions and variables are named ok, but in returnFormattedData you've used "o" as a variable name.
- [x] Test util functions
  - Tests not written for this.
- [x] Drop tables and create tables in seed function

## Tests

- [x] Seeding before each test
- [x] If asserting inside a `forEach`, also has an assertion to check length is at least > 0
  - Need to make sure the returned array has length, the forEach check will still pass on an empty array!
- [x] Ensure all tests are passing
  - Test needs updating to reflect welcome message.
- [x] Cover all endpoints and errors

- `GET /api/topics`

  - [x] Status 200, array of topic objects
    - Need to check that it is an array and the array length.

- `GET /api/articles/:article_id`

  - [x] Status 200, single article object (including `comment_count`)
  - [x] Status 400, invalid ID, e.g. string of "not-an-id"
  - [x] Status 404, non existent ID, e.g. 0 or 9999

- `PATCH /api/articles/:article_id`

  - [x] Status 200, updated single article object
    - Test description is copied from "bad path" and should be 200.
    - Should check the article properties including that vote has been updated.
    - Article should be send back on object.
  - [x] Status 400, invalid ID, e.g. string of "not-an-id"
  - [x] Status 404, non existent ID, e.g. 0 or 9999
  - [x] Status 400, missing / incorrect body, e.g. `inc_votes` property is not a number, or missing

- `GET /api/articles`

  - [x] Status 200, array of article objects (including `comment_count`, excluding `body`)
    - Body is still included.
  - [x] Status 200, default sort & order: `created_at`, `desc`
  - [x] Status 200, accepts `sort_by` query, e.g. `?sort_by=votes`
  - [x] Status 200, accepts `order` query, e.g. `?order=desc`
  - [x] Status 200, accepts `topic` query, e.g. `?topic=coding`
  - [x] Status 400. invalid `sort_by` query, e.g. `?sort_by=bananas`
  - [x] Status 400. invalid `order` query, e.g. `?order=bananas`
  - [x] Status 404. non-existent `topic` query, e.g. `?topic=bananas`
  - [x] Status 200. valid `topic` query, but has no articles responds with an empty array of articles, e.g. `?topic=paper`

- `GET /api/articles/:article_id/comments`

  - [x] Status 200, array of comment objects for the specified article
    - Should test the array length.
    - In forEach the variable is comment not article.
  - [x] Status 400, invalid ID, e.g. string of "not-an-id"
  - [x] Status 404, non existent ID, e.g. 0 or 9999
  - [x] Status 200, valid ID, but has no comments responds with an empty array of comments

- `POST /api/articles/:article_id/comments`

  - [x] Status 201, created comment object
    - Comment should be an object not an array.
  - [x] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
    - '9999' is a valid but non-existent id.
  - [ ] Status 400, missing required field(s), e.g. no username or body properties
  - [ ] Status 404, username does not exist
    - 400 should be 404.
  - [ ] Status 201, ignores unnecessary properties

- `GET /api`

  - [x] Status 200, JSON describing all the available endpoints

## Routing

- [x] Split into api, topics, users, comments and articles routers
- [x] Use `.route` for endpoints that share the same path

## Controllers

- [x] Name functions and variables well
- [x] Add catch blocks to all model invocations (and don't mix use of`.catch(next);` and `.catch(err => next(err))`)

## Models

- Protected from SQL injection
  - [x] Using parameterized queries for values in `db.query` e.g `$1` and array of variables
  - [x] Sanitizing any data for tables/columns, e.g. greenlisting when using template literals or pg-format's `%s`
- [x] Consistently use either single object argument _**or**_ multiple arguments in model functions
- [ ] Use `LEFT JOIN` for comment counts

## Errors

- [x] Use error handling middleware functions in app and extracted to separate directory/file
- [x] Consistently use `Promise.reject` in either models _**OR**_ controllers

## Extra Tasks - To be completed after hosting

- `DELETE /api/comments/:comment_id`

- [ ] Status 204, deletes comment from database
- [ ] Status 404, non existant ID, e.g 999
- [ ] Status 400, invalid ID, e.g "not-an-id"

- `GET /api/users`

- [ ] Status 200, responds with array of user objects

- `GET /api/users/:username`

- [ ] Status 200, responds with single user object
- [ ] Status 404, non existant ID, e.g 999
- [ ] Status 400, invalid ID, e.g "not-an-id"

- `PATCH /api/comments/:comment_id`

  - [ ] Status 200, updated single comment object
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 400, missing / incorrect body, e.g. `inc_votes` property is not a number, or missing

## Extra Advanced Tasks

### Easier

- [ ] Patch: Edit an article body
- [ ] Patch: Edit a comment body
- [ ] Patch: Edit a user's information
- [ ] Get: Search for an article by title
- [ ] Post: add a new user

### Harder

- [ ] Protect your endpoints with JWT authorization. We have notes on this that will help a bit, _but it will make building the front end of your site a little bit more difficult_
- [ ] Get: Add functionality to get articles created in last 10 minutes
- [ ] Get: Get all articles that have been liked by a user. This will require an additional junction table.
- [ ] Research and implement online image storage or random generation of images for topics
