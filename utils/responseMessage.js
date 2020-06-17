
const message = (code, msg) => {
  return {
    code,
    message: msg
  }
}

const err = (msg = '服务器开了一下小差～', code = -1) => {
  return message(code, msg)
}

const success = () => message(0, 'success')


module.exports = {
  err,
  success
}

