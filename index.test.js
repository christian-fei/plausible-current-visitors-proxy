const { serial, beforeEach, afterEach } = require('ava')
const nock = require('nock')
const listen = require('.')

const http = require('http')

const DOMAIN = 'cri.dev'
let server
beforeEach(() => {
  server = listen(0, DOMAIN)
})
afterEach(() => {
  server.close()
})

serial('server proxies through to plausible.io api', async function (t) {
  const scope = nock('https://plausible.io')
    .get(`/api/stats/${DOMAIN}/current-visitors`)
    .reply(200, '123')
  const address = `http://127.0.0.1:${server.address().port}`

  t.truthy(server)
  t.truthy(address)
  console.log('making request to', address)

  const res = await request(address)

  scope.done()
  res.on('data', function (chunk) {
    const stringified = chunk.toString()
    console.log('received chunk', stringified)
    t.is(stringified, '123')
  })
})

function request (address) {
  return new Promise((resolve, reject) => {
    http.get(address, function (res) {
      resolve(res)
    })
  })
}
