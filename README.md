# Timeato
<img width="1440" alt="188342389-7fa669a1-e757-42da-b3c1-36146e0adacd" src="https://user-images.githubusercontent.com/77141303/188753629-4b6039e1-a8d6-4722-ade4-aa5419704969.png">


### Introduction

### Folder Structure

### Branch Structure

Production (main) <br>
&nbsp;|\_ Test

### How to make a PR

If you want to help us improve our API, please fork the repo and follow these steps before creating a pull request.

#### First Work

1. Visit [our Issues](https://github.com/Cool-Kids-Coding/Pomodoro/issues) page to check if an issue exists and does not yet have an assignee. Assign yourself to the issue if you find what you are planning to solve.
2. Clone on your local device. The link can be found under the code drop-down at the base of your fork (`git clone https://github.com/Cool-Kids-Coding/Pomodoro`)
3. If you are adding a resource, please skip to step 6.
4. Create a new branch for your feature using the name of the feature (`git branch <featureName>`)
5. Switch to the branch you are working on (`git checkout <featureName>`)
6. **Make your changes, commit after every isolated task.**
7. Add all of your changes (`git add <file name here>` or `git add .`). Do not push any changes to dependencies unless the Issue calls for it.
8. Commit your changes with a detailed description (`git commit -m 'added a, solved b, etc...'`)
9. Push to the Branch (`git push origin <featureName>`)
10. Open a Pull Request and follow the rules under "Where should I make my pull request to?"

### Workflow after setup

1. `git status` to see your working branch
2. `git pull`
3. `git branch <featureName>`
4. `git checkout <featureName>`
5. Make changes to files/feature
6. `git add .`
7. `git commit -m "message"`
8. `git push --set-upstream origin <featureName>` (On first commit)

#### After feature is finished

1. Click merge
2. Make sure the PR says base:test <- base:timer

### Where should I make my pull request to?

<ins>Never make a pull request into the main branch</ins>. If you plan on adding a feature, wait until you have completely finished that feature and then make a pull request into "test" with a clear description of the issue you are solving.

## Instructions for Install - For Users

---

### Packages/Dependencies used

### bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

### Install all the dependencies or node packages used for development via Terminal

### `npm install`

### Things to add

-   Create a `.env` file and add the following as `key= value`
    -   DB_STRING = `mongodb connection URI`
    -   SECRET_SESSION = `string secret to pass into express-session instance`
    ***
