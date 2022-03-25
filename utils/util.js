let formatDate = date => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  return `${[year, month, day].map(formatNumber).join('-')}`
}

let formatTime = date => {
  let hour = date.getHours()
  let minute = date.getMinutes()

  return `${[hour, minute].map(formatNumber).join(':')}`
}

let formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`  // 字符串'0'结果为true
}

module.exports = {
  formatDate,
  formatTime
}