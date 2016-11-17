// 版本号比较，只适合 3 位版本号比较
function compareVersion (left, right) {
  if (!(left && right)) {
    return false
  }
  const leftArr = left.split('.', 3)
  const rightArr = right.split('.', 3)
  for (var i = 0; i < 3; i++) {
    var a = parseInt(leftArr[i], 10)
    var b = parseInt(rightArr[i], 10)
    if (a > b) {
      return true
    } else if (a < b) {
      return false
    }
  }
  return true
}

exports.compareVersion = compareVersion