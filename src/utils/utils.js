import moment from 'moment'

const selectStatus = (state, type) => {
  const isColor = type === 'color'
  switch (state - 0) {
    case -1:
      return isColor ? 'red' : '已撤销'
    case 0:
      return isColor ? 'yellow' : '未成交'
    case 1:
      return isColor ? 'blue' : '部分成交'
    case 2:
      return isColor ? 'green' : '已成交'
    case 4:
      return isColor ? 'yellow' : '撤单处理中'
    default:
      return isColor ? 'blue' : '确认中'
  }
}

const formatDate = date => moment(moment.unix(date)).format('YYYY-MM-DD HH:mm:ss')

const reg = {
  validatefloat: /^[0-9]+([.][0-9]{1,2})?$/,
  fivePercent: /^[0-5]{1}([.][0-9]{1,2})?$/,
  depthPercent: /^[-+]?[0](([.][0-4][0-9]?)|([.][5][0]?))?$/,
  sdScale(value) {
    const float = Number(value)
    return float > 0.1 && float <= 100
  },
  entrustInterval(value) {
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

export { utils, selectStatus, formatDate, reg, mes }
