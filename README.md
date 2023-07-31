Welcome to my project ReadMe, this is a CRUD application set to create, read, update an delete a user.
Below are the steps to initialize and run this API. i'll try to be as sequential as possible in listing the steps.

Installation:

- Clone this repo and
- Run 'npm install' to get the neecessary dependencies,
- Start the program using 'nodemon app.js'.
- Add a '.env' file in the parent directory of the project, this file willcontain 3 string variables .
  - 1: your 'MONGO_URL' which will be the url to your mongo db table.
  - 2: your 'JWT_SECRET' this is the secret character used to create json web token.
  - 3: finally your 'JWT_LIFETIME' this is the duration you want your tokens to last.

Usage:

- This Application takes in CRUD credentials from the user and works with it. Create a user, login with the necessary credentials.
- Copy the returned token and paste in the request headers in Postman and save it as 'token' if using Postman
- The token is used to access the authourized routes like the update, get, delete and logout user routes.

API Endpoints:

- A total of 6 routes endpoints exist in this application, you can replace the 'localhost:3000' with your Base URL
- | PATCH | 'localhost:3000/api/v1/account' //method to update a user
- | DELETE | 'localhost:3000/api/v1/account' //method to delete a user
- | POST | 'localhost:3000/api/v1/account' //method to create a user
- | GET | 'localhost:3000/api/v1/account' //method to read a user

- | POST | 'localhost:3000/api/v1/auth' //method to login a user
- | DELETE | 'localhost:3000/api/v1/auth' //method to delete a user
- NOTE: the update, logout, delete and get user routes are authenticated, which means the user must be registered and logged in first in order to access them.

Technologies:

- This application was built with several packages:
  - Node JS: (Javascript framework for backend integration)
  - Mongo DB: (Database) - Express JS: (Node js package to aid )
  - Mongoose: (Mongo Db package) - JWT(json web token),
    and others.
    Authors: - Yours truly.

Acknowledgements: - I really appreciate the Compass Node JS Scrums, special thanks to Paulo for suggesting material links to help me debug.
