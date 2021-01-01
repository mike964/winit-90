// This file was built bcus it's not possible to add comments in package.json :)
let x = {
  "name": "moslm-roadmap",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    // ** Brad line from Mern ecommerce project that I removed 
    //  "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@stripe/stripe-js": "^1.11.0",
    "axios": "^0.19.2",
    "bcryptjs": "^2.4.3",
    "colors": "^1.4.0",
    "compression": "^1.7.4",
    "cookie-parser": "^1.4.5",
    "cookie-session": "^1.4.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-async-handler": "^1.1.4",
    "express-fileupload": "^1.1.7-alpha.3",
    "express-validator": "^6.8.0",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.27.0",
    "mongoose": "^5.10.9",
    "passport": "^0.4.1",
    "passport-google-oauth20": "^2.0.0",
    "stripe": "^8.126.0"
  },
  "devDependencies": {
    "concurrently": "^5.3.0",
    "nodemon": "^2.0.2"
  },
  "engines": {
    "node": ">=10.0.0"
  }
}