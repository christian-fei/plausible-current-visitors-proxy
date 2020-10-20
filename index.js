#!/usr/bin/env node

const http = require('http')
const https = require('https')

if (require.main === module) {
  listen(+process.env.PORT || 0, process.env.DOMAIN)
} else {
  module.exports = listen
}
function listen (port = 8080, domain = '') {
  if (!domain) throw new Error('MISSING_DOMAIN')
  const proxyUrl = `https://plausible.io/api/stats/${domain}/current-visitors`
  const server = http.createServer(function listener (req, res) {
    console.log('getting url', proxyUrl)
    var connector = https.get(proxyUrl, function (serverResponse) {
      console.log('response from plausible.io')
      serverResponse.pause()
      res.writeHeader(serverResponse.statusCode, serverResponse.headers)
      serverResponse.pipe(res)
      serverResponse.resume()
    })
    req.pipe(connector)
    req.resume()
  })
  server.listen(port)
  console.log('server listening at', `http://127.0.0.1:${server.address().port}`)
  return server
}
