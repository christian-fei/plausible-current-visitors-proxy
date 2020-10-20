const { test } = require('m.test')
const nock = require('nock')
const { ok, strictEqual } = require('assert')
const listen = require('.')

const http = require('http')

test('server proxies through to plausible.io api', function (done) {
  const scope = nock('https://plausible.io')
    .get('/api/stats/cri.dev/current-visitors')
    .reply(200, '123')
  const server = listen(0, 'cri.dev')
  const address = `http://127.0.0.1:${server.address().port}`

  ok(server)
  ok(address)
  console.log('making request to', address)
  http.get(address, (res) => {
    server.close()
    res.on('data', function (chunk) {
      const stringified = chunk.toString()
      console.log('received chunk', stringified)
      strictEqual(stringified, '123')
    })

    scope.done()
    done()
  })
})
