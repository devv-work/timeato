<div align="center">
    <img width="700" alt="188342389-7fa669a1-e757-42da-b3c1-36146e0adacd" src="https://user-images.githubusercontent.com/77141303/188753629-4b6039e1-a8d6-4722-ade4-aa5419704969.png">
    <h1>Timeato</h1>
    <p>A pomodoro app that allows you to track your study sessions</p>
    <a href="https://timeato-production.up.railway.app/">timeato-production.up.railway.app/</a>
</div>


## Introduction
Timeato is an open source pomodoro study buddy built in JavaScript. Our platform aims to provide users the ability to increase productivity while setting aside time to study and do work. Create an account and start tracking study session information. After we authenticate you as a user, we are able to track the amount of time you have spent studying each of your selected tasks. 

### Project Installation
1. Fork our repository
2. Navigate to a local directory where you would like the project to be cloned to
3. Clone the repository to your local environment (`git clone <link here>`)
4. Install all of our dependencies (`npm install` or `npm i`)
5. Create a `.env` file and add the following variables:
    - DB_STRING = `mongodb connection URI`.
    - SECRET_SESSION = `string secret to pass into express-session instance`.

### Project Dependencies

 - bcrypt
 - connect-mongo
 - dotenv, ejs
 - express
 - express-flash
 - express-session
 - mongodb
 - mongoose
 - morgan
 - nodemon
 - passport
 - passport-local
 - validator

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please visit <a href="https://github.com/devv-work/timeato/blob/main/CONTRIBUTING.md">`CONTRIBUTING.md`</a> to read about our guidelines before making a contribution to our project. Thank you!
