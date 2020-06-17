const Koa = require('koa')
const App = new Koa()
const router = require('./router')
const middleware = require('./middleware')
middleware(App) // bodyParser需要在router之前
router(App)
App.listen(2008)
