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
|:----------------|:------------|:----------------------------|
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







