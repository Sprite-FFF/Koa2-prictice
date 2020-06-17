const { query } = require("../db")
const { err, success } = require('../utils/responseMessage')
const getUserByName = async(username) => {
  const rows = await query('SELECT * FROM user WHERE username = ?', username)
  if (rows.length === 0) {
    return Promise.resolve(false)
  }
  return Promise.resolve(rows[0])
}
const login = async (params = {}) => {
  if(!params.username || !params.password) {
    return Promise.resolve(err('用户名和密码不能为空'))
  }
  const user = await getUserByName(params.username)
  if(!user) {
    return Promise.resolve(err('用户名不存在'))
  }
  if(user.password !== params.password) {
    return Promise.resolve(err('密码错误'))
  }
  return Promise.resolve({ ...success(), data: rows[0] })
}

const register = async (params = {}) => {
  if(!params.username || !params.password) {
    const result = { code: -1, message: '' }
    return Promise.resolve(err('用户名和密码不能为空'))
  }
  const user = await getUserByName(params.username)
  if(user) {
    return Promise.resolve(err('用户名已存在'))
  }
  const result = await query('INSERT INTO user SET ?', params)
  return Promise.resolve(success())
}

module.exports = {
  login,
  register
}