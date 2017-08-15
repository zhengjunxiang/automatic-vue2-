const utils = {
  useElement: function (vue, ...reset) {
    reset.map(item => {
      vue.use(item)
    })
  }
}

const reg = {
  validatefloat: /^[0-9]+([.][0-9]{1,2})?$/,
  fivePercent: /^[0-5]{1}([.][0-9]{1,2})?$/,
  depthPercent: /^[-+]?[0](([.][0-4][0-9]?)|([.][5][0]?))?$/,
  sdScale: function (value) {
    const float = Number(value)
    return float > 0.1 && float <= 100
  },
  entrustInterval: function (value) {
    const float = Number(value)
    return float >= 1 && float <= 600
  }
}

const mes = {
  float: '请输入数字(小数点后两位)',
  fivePercent: '请输入0-5的数字(小数点后两位)',
  depthPercent: '请输入0- ±0.5的数字(小数点后两位)',
  sdScale: '请输入0.1%-100的数字',
  entrustInterval: '请输入1-600的数字'
}

export {utils, reg, mes}
