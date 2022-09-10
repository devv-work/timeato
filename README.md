<div align="center">
    <img width="150px" src="https://user-images.githubusercontent.com/77141303/189505187-cdd05b52-c769-4595-9c33-3238c94b963f.png" />
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

## Report a bug

If you encounter a bug and/or have any suggestions for our team, please visit our [issues page](https://github.com/devv-work/timeato/issues) and create a new issue. If you wish to implement a feature on your own, please visit our <a href="https://github.com/devv-work/timeato/blob/main/CONTRIBUTING.md">Contributing Guidelines</a> and follow our requirements.

If you have encountered a bug, please provide as much information as you can to help us replicate the issue on our own end. Depending on the issue, it may be useful to communicate your browser, screen width, and/or anything that relates to your specific encounter.
