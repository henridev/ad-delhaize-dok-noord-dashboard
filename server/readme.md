# deploying via heroku

`git init` on the project
`git add . && git commit -m "first commit"`
`heroku git: remote -a project-name`
`git push heroku master`

in high level package.json

- specify node version to use
  "engines": {
  "node": "8.9.4"
  },

---

will set following variables

- NPM_CONFIG_LOGLEVEL=error
- NODE_ENV=production
- NODE_MODULES_CACHE=true
- NODE_VERBOSE=false

* specify what to preinstall -- preinstall command
  `"preinstall": "echo --- preinstall --- && cd server && npm install && cd ../client && npm install && npm run build && cd ..",`

* specify how to build our app
  `"build": "cd client && npm run build"`

* specify how to run your node server
  `"start": "echo --- start --- && cd server && npm start"`
