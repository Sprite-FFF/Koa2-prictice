const fs = require('fs')
const path = require('path')
const JWT = require('jsonwebtoken')
const { query } = require("../db")
const { err, success } = require('../utils/responseMessage')
const { resolve } = require('path')
const { info } = require('console')
const getUserByName = async(username) => {
  const rows = await query('SELECT * FROM user WHERE username = ?', username)
  if (rows.length === 0) {
    return Promise.resolve(false)
  }
  return Promise.resolve(rows[0])
}

const generateToken = (payload) => {
  const priviteKey = fs.readFileSync(path.resolve(__dirname, '../config/rsa_private_key.pem'))
  const rs256Token = JWT.sign(payload, priviteKey, { algorithm: 'RS256' })
  const token = Buffer.from(rs256Token).toString('base64')
  return token
}

const verifyToken = (token) => {
  return new Promise(resolve => {
    const rs256Token = Buffer.from(token, 'base64').toString()
    const publicKey = fs.readFileSync(path.resolve(__dirname, '../config/rsa_public_key.pem'))
    JWT.verify(rs256Token, publicKey, (_error, decoded) => {
      if(_error) {
        return resolve(_error.message)
      }
      resolve(decoded)
    })
  })
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
  const token = generateToken(JSON.parse(JSON.stringify(user)))
  return Promise.resolve({ ...success(), data: { token } })
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

const getUserInfo = async (token) => {
  const user  = await verifyToken(token)
  if(typeof user !== 'object') {
    return Promise.resolve(err('无效的Token'))
  }
  delete user.password
  return Promise.resolve({ ...success(), data: user })
}

const updateUserInfo = async (id, info) => {
  const result = await query('UPDATE user SET ? WHERE id = ?', [info, id])
  console(result)
}

const modifyPassword = async = (token, params) => {
  
}

module.exports = {
  login,
  register,
  getUserInfo,
  modifyPassword
}