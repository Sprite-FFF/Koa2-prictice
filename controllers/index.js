const { query } = require("../db")
const user = require('../service/user')
const fs = require('fs')

async function readFile(path) {
  return new Promise((resolve, reject) => {
      fs.readFile(path, (_error, file) => {
        return _error ? reject(_error) : resolve(file)
      })
  })
}

const home = async ctx => {
  const html = await readFile('./public/index.html')
  ctx.type = 'text/html,charset=utf-8'
  ctx.body = html
}

const login = async ctx => {
  console.log(ctx.request.body)
  const result = await user.login(ctx.request.body)
  ctx.type = 'json'
  ctx.body = result
}

const register = async ctx => {
  const result = await user.register(ctx.request.body)
  ctx.type = 'json'
  ctx.body = result
}

module.exports = {
  home,
  login,
  register
}