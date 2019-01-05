const Serial = require('./Serial')

const portOpt = { // TODO from DB
  port: 'COM3',
  baudRate: 9600,
  dataBits: 7, // Must be one of these: 8, 7, 6, or 5.
  stopBits: 1, // Must be one of these: 1 or 2.
  parity: 'even', // Must be one of these: 'none', 'even', 'mark', 'odd', 'space'.
  autoOpen: false,
}

const parserOpt = { // TODO from DB
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
const s = new Serial(portOpt, parserOpt)

s.open((err) => {
  if (err) throw err
  s.ondata((err, data) => {
    if (err) return console.log(err)
    return console.log(data)
  })
})

