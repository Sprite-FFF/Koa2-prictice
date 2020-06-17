
const path = require('path')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
module.exports = app => {
  app.use(bodyParser())
  app.use(static(
    path.join(__dirname, '/public')
  ))
}