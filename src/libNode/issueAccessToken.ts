import got from 'got'
const post = got.post

export type IssueAccessTokenParams = {
  /**
   * (Optional - default: 'authorization_code') authorization_code. Specifies the grant type.
   */
  grant_type?: string
  /**
   * (Required) Authorization code. Code returned in the authorization request.
   */
  code: string
  /**
   * (Required) Callback URL. Must match one of the the callback URLs registered for your channel in the console.
   */
  redirect_uri: string
  /**
   * (Required) Channel ID. Found in the console.
   */
  client_id: string
  /**
   * (Required) Channel secret. Found in the console.
   */
  client_secret: string
}

/**
 * The LINE Platform validates the request and returns an access token and other data as shown in the table below.
 *
 * New or changed LINE Login functions may cause changes in the structure of the payload JSON object. These changes may include added properties, variations in property order, and added/removed white space and line breaks. Design your backend so that it can handle payload data objects with unexpected structures.
 *
 * Returns status code 200 and a JSON object with the following information.
 */
export type IssueAccessTokenResponse = {
  /**
   * Access token. Valid for 30 days.
   */
  access_token: string
  /**
   * Amount of time in seconds until the access token expires.
   */
  expires_in: number
  /**
   * JSON Web Token (JWT) that includes information about the user. This field is returned only if openid is specified in the scope. For more information, see Verify ID token.
   */
  id_token: string
  /**
   * Token used to get a new access token. Valid up until 90 days after the access token issued.
   */
  refresh_token: string
  /**
   * Permissions granted by the user. However, the email scope is not returned as a value of the scope property even if the permission has been granted.
   */
  scope: string
  /**
   * Bearer
   */
  token_type: string
}

/**
 * (Node only) Makes a POST request to retrieve an access token from LINE. This uses GOT as a dependency to make the request.
 * Can throw errors.
 *
 * LINE documentation: https://developers.line.biz/en/docs/line-login/integrate-line-login/#get-access-token
 *
 * @param {IssueAccessTokenParams} params
 * @returns {Promise<IssueAccessTokenResponse>}
 */
export async function issueAccessToken(
  params: IssueAccessTokenParams,
): Promise<IssueAccessTokenResponse> {
  const { grant_type = 'authorization_code', code, redirect_uri, client_id, client_secret } = params
  if (!code || !redirect_uri || !client_id || !client_secret) {
    throw new Error('Missing information in params')
  }
  /**
   * To get an access token, make an HTTP POST request with the authorization code. Once you have an access token, you can use it to make API calls. The access token is issued at the following endpoint.
   * The information in the request body should be:
   * Content-Type: application/x-www-form-urlencoded
   */
  const form = { grant_type, code, redirect_uri, client_id, client_secret }
  const {
    body,
  }: {
    body: { data: IssueAccessTokenResponse }
  } = await post('https://api.line.me/oauth2/v2.1/token', { form, responseType: 'json' })
  const response: IssueAccessTokenResponse = body.data
  return response
}
