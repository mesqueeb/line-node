'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var got = require('got');
var jwt = require('jsonwebtoken');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var got__default = /*#__PURE__*/_interopDefaultLegacy(got);
var jwt__default = /*#__PURE__*/_interopDefaultLegacy(jwt);

/**
 * Generates a non-safe random string which can have duplicates around 7 million generations.
 */
function randomString(length = 20) {
    return Array(length)
        .fill(0)
        .map(() => Math.random().toString(36).charAt(2))
        .join('');
}

/**
 * Get a URL that users can access to login with LINE and be redirected to your app again.
 *
 * LINE documentation: https://developers.line.biz/en/docs/line-login/integrate-line-login/#making-an-authorization-request
 *
 * @param {LineLoginUrlParams} params Only client_id & redirect_uri are required props.
 * @returns {string} the `https://access.line.me/oauth2/v2.1/authorize${query}` URL with correct query
 */
function getLineLoginUrl(params) {
    const { response_type = 'code', state = randomString(), scope = 'openid', redirect_uri: _redirect_uri, } = params;
    const redirect_uri = _redirect_uri.replace(/:/g, '%3A').replace(/\//g, '%2F');
    const paramsObject = { ...params, response_type, redirect_uri, state, scope };
    const query = Object.entries(paramsObject)
        .map((entry) => entry.join('='))
        .join('&');
    return `https://access.line.me/oauth2/v2.1/authorize?${query}`;
}

/**
 * Once the user is authenticated and authorization is complete, the HTTP status code 302 and query parameters are returned in the callback URL. This function converts the callback URL to an object with the query parameters.
 *
 * @param {string} callbackUrlTriggered eg. https://client.example.org/cb?code=abcd1234&state=0987poi&friendship_status_changed=true
 * @returns {LoginCallbackParamsSuccess | LoginCallbackParamsError}
 * @example // Success example:
HTTP/1.1 302 Found
Location: https://client.example.org/cb?code=abcd1234&state=0987poi&friendship_status_changed=true
 * @example // Error example:
Location: https://example.com/callback?error=access_denied&error_description=The+resource+owner+denied+the+request.&state=0987poi
 */
function getParamsFromLoginCallback(callbackUrlTriggered) {
    const query = callbackUrlTriggered.split('?')[1];
    const queryEntries = query.split('&').map((q) => q.split('='));
    const queryObject = Object.fromEntries(queryEntries);
    return queryObject;
}

const post = got__default["default"].post;
/**
 * (Node only) Makes a POST request to retrieve an access token from LINE. This uses GOT as a dependency to make the request.
 * Can throw errors.
 *
 * LINE documentation: https://developers.line.biz/en/docs/line-login/integrate-line-login/#get-access-token
 *
 * @param {IssueAccessTokenParams} params
 * @returns {Promise<IssueAccessTokenResponse>}
 */
async function issueAccessToken(params) {
    const { grant_type = 'authorization_code', code, redirect_uri, client_id, client_secret } = params;
    if (!code || !redirect_uri || !client_id || !client_secret) {
        throw new Error('Missing information in params');
    }
    /**
     * To get an access token, make an HTTP POST request with the authorization code. Once you have an access token, you can use it to make API calls. The access token is issued at the following endpoint.
     * The information in the request body should be:
     * Content-Type: application/x-www-form-urlencoded
     */
    const form = { grant_type, code, redirect_uri, client_id, client_secret };
    const response = await post('https://api.line.me/oauth2/v2.1/token', {
        form,
        responseType: 'json',
    });
    const { body } = response;
    return body;
}

const { decode } = jwt__default["default"];
/**
 * (Node only) Returns a decoded LINE id token. Uses the nodeJS 'jsonwebtoken' dependency.
 * This id Token should be validated!
 * LINE documentation: https://developers.line.biz/en/docs/line-login/integrate-line-login/#decode-and-validate-id-token
 */
function decodeIdToken(idToken) {
    // get the decoded payload ignoring signature, no secretOrPrivateKey needed
    return decode(idToken, { complete: true });
}

exports.decodeIdToken = decodeIdToken;
exports.getLineLoginUrl = getLineLoginUrl;
exports.getParamsFromLoginCallback = getParamsFromLoginCallback;
exports.issueAccessToken = issueAccessToken;
