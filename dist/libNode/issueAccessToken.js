import got from 'got';
const post = got.post;
/**
 * (Node only) Makes a POST request to retrieve an access token from LINE. This uses GOT as a dependency to make the request.
 * Can throw errors.
 *
 * LINE documentation: https://developers.line.biz/en/docs/line-login/integrate-line-login/#get-access-token
 *
 * @param {IssueAccessTokenParams} params
 * @returns {Promise<IssueAccessTokenResponse>}
 */
export async function issueAccessToken(params) {
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
