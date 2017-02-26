'use strict'

require('dotenv/config')

const postmark = require('.')

module.exports = test

if (require.main === module) {
  test().then(() => {
    console.error('[test] E-Mail sent')
  }, err => {
    console.error('[test] Sending failed!')
    console.error('')
    console.error('%s', JSON.stringify(err, null, 2))
  })
}

function test () {
  return new Promise((resolve, reject) => {
    postmark({
      apiKey: process.env.POSTMARK_API_KEY,
      from: 'info@domachine.de',
      url: `http://localhost:3000`
    })('testtoken', '0001', 'db@domachine.de', err =>
      err ? reject(err) : resolve()
    )
  })
}
