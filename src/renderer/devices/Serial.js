const SerialPort = require('serialport')
const DataParser = require('./parser')

function Serial(portOpt, parserOpt) {
  portOpt.autoOpen = false
  const sp = new SerialPort(portOpt.port, portOpt)
  const parser = new DataParser(sp, parserOpt)

  this.open = cb => sp.open(cb)
  this.close = cb => sp.close(cb)
  this.ondata = cb => parser.on(cb)
}

module.exports = Serial
