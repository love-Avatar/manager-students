// 合并抛出所有的逻辑
const cont = require['context']('./model', false, /\.js$/);

let arr = cont.keys().map((key) =>
  Object.entries(cont(key)))

let brr = []
arr.forEach((item) => {
  brr = brr.concat(item)
})

const obj = Object['fromEntries'](brr)
export default obj
