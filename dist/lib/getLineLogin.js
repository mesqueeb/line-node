import { randomString } from '../helpers/randomString.js';
/**
 * Get a URL that users can access to login with LINE and be redirected to your app again.
 *
 * LINE documentation: https://developers.line.biz/en/docs/line-login/integrate-line-login/#making-an-authorization-request
 *
 * @param {LineLoginUrlParams} params Only client_id & redirect_uri are required props.
 * @returns {string} the `https://access.line.me/oauth2/v2.1/authorize${query}` URL with correct query
 */
export function getLineLoginUrl(params) {
    const { response_type = 'code', state = randomString(), scope = 'openid', redirect_uri: _redirect_uri, } = params;
    const redirect_uri = _redirect_uri.replace(/:/g, '%3A').replace(/\//g, '%2F');
    const paramsObject = { ...params, response_type, redirect_uri, state, scope };
    const query = Object.entries(paramsObject)
        .map((entry) => entry.join('='))
        .join('&');
    return `https://access.line.me/oauth2/v2.1/authorize?${query}`;
}
