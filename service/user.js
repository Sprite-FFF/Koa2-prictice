const { query } = require("../db")

const login = async (params = {}) => {
  if(!params.username || !params.password) {
    const result = { code: -1, message: '用户名和密码不能为空' }
    return Promise.resolve(result)
  }
  const rows = await query('SELECT * FROM user WHERE username = ?', params.username)
  if(rows.length === 0) {
    const result = { code: -1, message: '用户名不存在' }
    return Promise.resolve(result)
  }
  if(rows[0].password !== params.password) {
    const result = { code: -1, message: '密码错误' }
    return Promise.resolve(result)
  }
  return Promise.resolve({ code: 0, message: 'success', data: rows[0] })
}

const register = async (params = {}) => {
  if(!params.username || !params.password) {
    const result = { code: -1, message: '用户名和密码不能为空' }
    return Promise.resolve(result)
  }
  const rows = await query('SELECT * FROM user WHERE username = ?', params.username)
  if(rows.length !== 0) {
    return Promise.resolve({ code: -1, message: '用户名已存在' })
  }
  const result = await query('INSERT INTO user SET ?', params)
  return Promise.resolve({ code: 0, message: 'success' })
}

module.exports = {
  login,
  register
}