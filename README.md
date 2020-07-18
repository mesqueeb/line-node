# LINE NODE

```
npm i line-node
```

LINE NodeJS SDK.

## NodeJS helper functions for LINE

> Please note that the Node only helpers cannot be used in a browser environment!

Node helpers use [GOT](https://github.com/sindresorhus/got) as dependency to make requests.

Functions:

- [issueAccessToken](https://github.com/mesqueeb/line-ts/blob/production/src/libNode/issueAccessToken.ts)

<!-- prettier-ignore-start -->
```js
import { issueAccessToken } from 'line-ts'

const payload = { code, redirect_uri, client_id, client_secret }
const result = await issueAccessToken(payload)

// result looks like:
{ access_token, expires_in, id_token, refresh_token, scope, token_type }
```
<!-- prettier-ignore-end -->

- [decodeIdToken](https://github.com/mesqueeb/line-ts/blob/production/src/libNode/decodeIdToken.ts)

<!-- prettier-ignore-start -->
```js
import { decodeIdToken } from 'line-ts'

const payload = `line.id.token`
const result = await decodeIdToken(payload)

// result looks like:
{ header, payload, signature }
// you can retrieve information from the payload:
//   sub is the user id
{ sub, name, picture, email } = payload
```
<!-- prettier-ignore-end -->

For more information, click on the function links where you can see further documentation & types.

## TypeScript helper functions for LINE

Check [line-ts](https://github.com/mesqueeb/line-ts) for TypeScript helper functions including:

- getLineLoginUrl
- getParamsFromLoginCallback
