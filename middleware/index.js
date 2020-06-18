function vertifyToken(whiteList = []) {
  return async function (ctx, next) {
    if(whiteList.includes(ctx.path)) {
      await next()
      return
    }
    const { token } = ctx.request.header
    if(!token) {
      ctx.type = 'json'
      ctx.status = 401
      ctx.body = { code: -1, message: '无效的token' }
      return
    }
    await next()
  }
}

module.exports = {
  vertifyToken
}
