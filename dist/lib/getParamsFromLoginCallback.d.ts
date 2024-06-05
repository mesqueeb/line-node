export type LoginCallbackParamsSuccess = {
    /**
     * Authorization code used to get an access token. Valid for 10 minutes. This authorization code can only be used once.
     */
    code: string;
    /**
     * state parameter included in the authorization URL of original request. Your application should verify that this value matches the one in the original request.
     */
    state: string;
    /**
     * true if the friendship status between the user and the LINE Official Account changes during login. Otherwise, the value is false. This parameter is only returned if the bot_prompt query parameter is specified when making an authorization request and the option to add your LINE Official Account as a friend when the user logged in is displayed. For more information, see Add a LINE Official Account as a friend when logged in (bot link).
     */
    friendship_status_changed?: boolean;
};
export type LoginCallbackParamsError = {
    /**
     * (Optional) Error code.
     */
    error: 'access_denied' | string;
    /**
     * (Optional) Details of the error.
     */
    error_description?: string;
    /**
     * (Optional) OAuth 2.0 state value. Required if the authorization Request included the state parameter.
     */
    state?: string;
};
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
export declare function getParamsFromLoginCallback(callbackUrlTriggered: string): LoginCallbackParamsSuccess | LoginCallbackParamsError;
