const { query } = require("../db")
const user = require('../service/user')
const fs = require('fs')
const { request } = require("http")

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

const login = async (ctx, next) => {
  const result = await user.login(ctx.request.body)
  ctx.type = 'json'
  ctx.body = result
}

const register = async ctx => {
  const result = await user.register(ctx.request.body)
  ctx.type = 'json'
  ctx.body = result
}

const getUserInfo = async ctx => {
  const result = await user.getUserInfo(ctx.request.header.token)
  ctx.type = 'json',
  ctx.body = result
}

const modifyPassword = async ctx => {
  const result = await user.modifyPassword(ctx.request.body)
  ctx.type = 'json',
  ctx.body = result
}
module.exports = {
  home,
  login,
  register,
  getUserInfo,
  modifyPassword
}