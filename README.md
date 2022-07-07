## H Accademy Unit 2 Project - Cardify
### Inpsiration
The inspiration for this project comes from the use of paper flashcard as a means of studying method

### Stack
- JavaScript
- Express.js
- PostgreSQL
- Prisma.io
- EJS
- Bootsrap 5.2
- jQuery 3.6
- SCSS
- HTML5

### Production Site
[Cardify](https://gentle-plains-13426.herokuapp.com/)
Demo Username: example@example.com
Demo Password: 111111

### Installation Guide
- Clone the folder `$ git clone git@github.com:ArturAronov/project2-cardify.git`
- Run `$ npm install`
- Run `$ npx prisma init`
- Add to `.env` file (create if not exist)
  ```env
  DATABASE_URL="postgresql://[user]:[password]@localhost:5432/[your_project_name_here]"
  SECRET_COOKIE_PASSWORD="complex_password_at_least_32_characters_long"
  ```
- Run `$ npx prisma migrate dev`

### Prisma Schema
- User    

|Field            |Type         |Attribute                    |
|-----------------|-------------|-----------------------------|
|id               |Int          |@id @default(autoincrement())|
|name             |String       |                             |
|email            |String       |@unique                      |
|avatar           |String       |                             |
|passwordHash     |String       |                             |
|totalCollections |Int          |@default(0)                  |
|totalFlashCards  |Int          |@default(0)                  |
|dateCreated      |DateTime?    |                             |
|dateUpdated      |DateTime?    |                             |
|Card             |Card[]       |                             |
|Collection       |Collection[] |                             |   


- Collection    

|Field            |Type         |Attribute                                    |
|-----------------|-------------|---------------------------------------------|
|id               |Int          |@id @default(autoincrement())                |
|title            |String       |                                             |
|description      |String?      |                                             |
|dateCreated      |DateTime?    |                                             |
|dateUpdated      |DateTime?    |                                             |
|createdBy        |User         |@relation(fields: [userId], references: [id])|
|userId           |Int          |                                             |
|Card             |Card[]       |                                             |


- Card    

|Field            |Type         |Attribute                                    |
|-----------------|-------------|---------------------------------------------|
|id               |Int          |                                             |
|question         |String       |                                             |
|answer           |String       |                                             |
|right            |Int          |@default(0)                                  |
|wrong            |Int          |@default(0)                                  |
|dateCreated      |DateTime?    |                                             |
|dateUpdated      |DateTime?    |                                             |
|createdBy        |User         |@relation(fields: [userId], references: [id])|
|userId           |Int          |                                             |
|collection       |Collection   |@relation(fields: [collectionId], references: [id], onDelete: Cascade)|
|collectionId     |Int          |                                             |


### API
|Method   |URL                                                    |Corresponding File                           |AUTH?    |
|---------|-------------------------------------------------------|---------------------------------------------|---------|
|POST     |/api/auth/signup                                       |src/controllers/api/auth/signup.js           |FALSE    |
|POST     |/api/auth/login                                        |src/controllers/api/auth/login.js            |FALSE    |
|DELETE   |/api/auth/logout                                       |src/controllers/api/auth/logout.js           |FALSE    |
|         |                                                       |                                             |         |
|GET      |/api/my/profile                                        |src/controllers/api/my/profile/show.js       |TRUE     |
|PUT      |/api/my/profile/update                                 |src/controllers/api/my/profile/update.js     |TRUE     |
|         |                                                       |                                             |         |
|POST     |/api/my/collections                                    |src/controllers/api/my/collections/create.js |TRUE     |
|GET      |/api/my/collections                                    |src/controllers/api/my/collections/show.js   |TRUE     |
|PUT      |/api/my/collections/:id                                |src/controllers/api/my/collections/update.js |TRUE     |
|DELETE   |/api/my/collections/:id                                |src/controllers/api/my/collections/delete.js |TRUE     |
|         |                                                       |                                             |         |
|POST     |/api/my/play/:id                                       |src/controllers/api/my/collections/play.js   |TRUE     |
|         |                                                       |                                             |         |
|POST     |/api/my/collections/:id/flashcards                     |src/controllers/api/my/flashcards/create.js  |TRUE     |
|GET      |/api/my/collections/:id/flashcards                     |src/controllers/api/my/flashcards/show.js    |TRUE     |
|PUT      |/api/collections/:collectionId/flashcards/:flashcardId |src/controllers/api/my/flashcards/update.js  |TRUE     |
|DELETE   |/api/collections/:collectionId/flashcards/:flashcardId |src/controllers/api/my/flashcards/delete.js  |TRUE     |



