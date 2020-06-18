const Router = require('koa-router')()
const controller = require('./controllers')
const routerMiddleware = require('./middleware/index')
module.exports = app => {
  // router.use的第二个参数为函数，函数传递ctx和next两个参数，
  // 可通过ctx进行权限验证后，判断是否执行next调用接口。
  // 这里特别需要注意的是函数使用next的时候需要添加await，
  // 如果不添加，在调用接口前，接口就会返回结果，前台则无法获取到数据。
  Router.use('/user/*', routerMiddleware.vertifyToken(['/user/login', '/user/add']))
  Router.get('/', controller.home)
  Router.post('/user/login', controller.login)
  Router.post('/user/add', controller.register)
  Router.get('/user/info', controller.getUserInfo)
  Router.get('/user/modifyPassword', controller.modifyPassword)
  app.use(Router.routes())
  app.use(Router.allowedMethods())
} 