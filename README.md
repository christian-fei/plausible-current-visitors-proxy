# plausible-current-visitors-proxy

This module can be used to retrieve the current visitors for your site on plausible.io

This is useful if you want to get past CORS from a browser to show the current visitors on your site.

It acts as a minimal proxy to `https://plausible.io/api/stats/YOUR_DOMAIN/current-visitors`

## usage

install via

```sh
npm i -g plausible-current-visitors-proxy
```

provide the environment variables `DOMAIN` (else it will error), and optionally `PORT` (chooses an available port by default)

```sh
DOMAIN=cri.dev plausible-current-visitors-proxy
> server listening at http://127.0.0.1:54151

curl http://127.0.0.1:54151
> 2
```
