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
|Method   |URL                                                    |Corresponding File                           |AUTH?    |Expected Error       |User Data                                                       |Response                                                                  |
|---------|-------------------------------------------------------|---------------------------------------------|---------|---------------------|----------------------------------------------------------------|--------------------------------------------------------------------------|
|POST     |/api/auth/signup                                       |src/controllers/api/auth/signup.js           |FALSE    |406                  |avatar<br/>name<br/>email<br/>password<br/>passwordConfirmation |id<br/>name<br/>email<br/>totalCollection<br/>totalFlashcards             |
|POST     |/api/auth/login                                        |src/controllers/api/auth/login.js            |FALSE    |406                  |email<br/>password                                              |id<br/>name<br/>email<br/>totalCollection<br/>totalFlashcards             |
|DELETE   |/api/auth/logout                                       |src/controllers/api/auth/logout.js           |FALSE    |none                 |                                                                |``Successfully logged out``                                               |
|         |                                                       |                                             |         |                     |                                                                |                                                                          |
|GET      |/api/my/profile                                        |src/controllers/api/my/profile/show.js       |TRUE     |401                  |                                                                |id<br/>avatar<br/>name<br/>email<br/>totalCollections<br/>totalFlashcards |
|PUT      |/api/my/profile/update                                 |src/controllers/api/my/profile/update.js     |TRUE     |401<br/>406          |avatar<br/>name<br/>email<br/>password<br/>passwordConfirmation |id<br/>avatar<br/>name<br/>email<br/>totalCollections<br/>totalFlashcards |
|         |                                                       |                                             |         |                     |                                                                |                                                                          |
|POST     |/api/my/collections                                    |src/controllers/api/my/collections/create.js |TRUE     |401<br/>406          |name<br/>description                                            |id<br/>name<br/>description<br/>dateCreated<br/>dateEdited<br/>flashcards |
|GET      |/api/my/collections                                    |src/controllers/api/my/collections/show.js   |TRUE     |401                  |                                                                |id<br/>name<br/>description<br/>dateCreated<br/>dateEdited<br/>flashcards |
|PUT      |/api/my/collections/:id                                |src/controllers/api/my/collections/update.js |TRUE     |401<br/>404<br/>406  |name<br/>description                                            |id<br/>name<br/>description<br/>dateCreated<br/>dateEdited<br/>flashcards |
|DELETE   |/api/my/collections/:id                                |src/controllers/api/my/collections/delete.js |TRUE     |401<br/>404          |                                                                |id<br/>name<br/>description<br/>dateCreated<br/>dateEdited<br/>flashcards |
|         |                                                       |                                             |         |                     |                                                                |                                                                          |
|POST     |/api/my/play/:id                                       |src/controllers/api/my/collections/play.js   |TRUE     |401<br/>404<br/>406  |answer                                                          |id<br/>question<br/>answer<br/>dateCreated<br/>dateEdited<br/>right<br/>wrong<br/>createdBy |
|         |                                                       |                                             |         |                     |                                                                |                                                                                            |
|POST     |/api/my/collections/:id/flashcards                     |src/controllers/api/my/flashcards/create.js  |TRUE     |406                  |question<br/>answer                                             |id<br/>question<br/>answer<br/>dateCreated<br/>dateEdited<br/>right<br/>wrong<br/>createdBy |  
|GET      |/api/my/collections/:id/flashcards                     |src/controllers/api/my/flashcards/show.js    |TRUE     |401                  |                                                                |id<br/>question<br/>answer<br/>dateCreated<br/>dateEdited<br/>right<br/>wrong<br/>createdBy |  
|PUT      |/api/collections/:collectionId/flashcards/:flashcardId |src/controllers/api/my/flashcards/update.js  |TRUE     |401<br/>404<br/>406  |question<br/>answer                                             |id<br/>question<br/>answer<br/>dateCreated<br/>dateEdited<br/>right<br/>wrong<br/>createdBy |  
|DELETE   |/api/collections/:collectionId/flashcards/:flashcardId |src/controllers/api/my/flashcards/delete.js  |TRUE     |401<br/>404          |                                                                |id<br/>question<br/>answer<br/>dateCreated<br/>dateEdited<br/>right<br/>wrong<br/>createdBy |  



