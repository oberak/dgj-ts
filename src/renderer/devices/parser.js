const Readline = require('@serialport/parser-readline')

/**
 * Data parser
 * @param {*} sp SerialPort
 * @param {*} opt data parse option
 */
function DataParser(sp, opt) {
  const option = opt || {
    length: 19,
    delimiter: '\r\n',
    fields: [
      { name: 'mcno', start: 0, length: 2 },
      { name: 'status', start: 3, length: 2 }, // US(unstable), ST(stable), OL(over load), UL(under load)
      { name: 'type', start: 6, length: 2 }, // GS(gross weight), NT(net weight)
      {
        name: 'data', start: 9, length: 8, type: 'number',
      }, // weight
      {
        name: 'unit', start: 17, length: 2, trim: true,
      }, // unit
    ],
  }

  const parse = (input) => {
    if (!input) throw Error('Data is null')
    if (input.length !== option.length) throw Error(`The data lengths do not match. [data:${input.length}/config:${option.length}]`)
    const data = {}
    option.fields.forEach((field) => {
      field.type = field.type || 'string'
      let value = input.substring(field.start, field.start + field.length)
      if (field.trim) value = value.trim()
      if (field.type === 'number') {
        value = parseInt(value.replace(/\s/gi, '0'), 10)
      }
      data[field.name] = value
    })
    return data
  }

  this.on = (callback) => {
    if (!option) {
      callback(new Error('DataParser option is null.'), null)
      return
    }
    const parser = sp.pipe(new Readline({ delimiter: option.delimiter }))
    parser.on('data', (data) => {
      try {
        callback(null, parse(data))
      } catch (err) {
        callback(err)
      }
    })
  }
}

module.exports = DataParser
