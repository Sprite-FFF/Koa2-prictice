const Router = require('koa-router')()
const controller = require('./controllers')
module.exports = app => {
  Router.get('/', controller.home)
  Router.post('/user/login', controller.login)
  Router.post('/user/add', controller.register)
  app.use(Router.routes())
  app.use(Router.allowedMethods())
} 