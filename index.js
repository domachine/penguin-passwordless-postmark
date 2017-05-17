'use strict'

const postmark = require('postmark')

module.exports = ({
  subject = 'Penguin.js passwordless',
  apiKey,
  from,
  url
}) => {
  const client = new postmark.Client(apiKey)
  if (!from) throw new Error('Need a from parameter')
  return (tokenToSend, uidToSend, recipient, callback) => {
    client.sendEmail({
      From: from,
      To: recipient,
      Subject: subject,
      TextBody:
        `Hello!
Access your account here:
${url}/auth/passwordless/login?token=${tokenToSend}&uid=${encodeURIComponent(uidToSend)}
`
    },
    function( err ) {
      if ( err ) {
        console.log(err)
        callback( err )
       }
      else{ callback() }
    })
  }
}
