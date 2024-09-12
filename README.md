# Travelers Social Media Website

## Overview
This project is a full-stack web application that allows users to register an account, log in, and deliver CRUD operations on the database. It is built using React for the frontend, Node.js and Express for the backend, and PostgreSQL for the database.

## Features
- User registration with email and password
- Session cookie management and persisted on the DB
- Protected routes for authenticated users
- Integration with a PostgreSQL database for storing page data
- CRUD operations to manage posts on the website
- Redux Toolkit usage
- React Bootstrap used throughout the entire webpage to handle responsiveness as well as proper styling

## Getting this App up and running
1. Clone this repository
2. Install dependencies for both the frontend and backend
```
cd YOUR_PATH/'Travelers Website'/backend
npm install

cd YOUR_PATH/'Travelers Website'/frontend
npm install
```
3. Set up the database and configure environment variables on the .env file in ../backend/src
4. Start the backend server
(`nodemon .\index.js`)
```
[nodemon] starting `ts-node index.ts`
Server is running on http://localhost:4000
Database connected successfully
Tables created successfully
```
5. Start the frontend server
(`npm start`)

The last lines of the output should be
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.141:3000

webpack compiled successfully
Files successfully emitted, waiting for typecheck results...
Issues checking in progress...
No issues found.
```

You can now point your browser to http://localhost:3000/!