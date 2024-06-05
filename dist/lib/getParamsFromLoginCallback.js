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
export function getParamsFromLoginCallback(callbackUrlTriggered) {
    const query = callbackUrlTriggered.split('?')[1];
    const queryEntries = query?.split('&').map((q) => q.split('=')) ?? [];
    const queryObject = Object.fromEntries(queryEntries);
    return queryObject;
}
