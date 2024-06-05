import jwt from 'jsonwebtoken';
const { decode } = jwt;
/**
 * (Node only) Returns a decoded LINE id token. Uses the nodeJS 'jsonwebtoken' dependency.
 * This id Token should be validated!
 * LINE documentation: https://developers.line.biz/en/docs/line-login/integrate-line-login/#decode-and-validate-id-token
 */
export function decodeIdToken(idToken) {
    // get the decoded payload ignoring signature, no secretOrPrivateKey needed
    return decode(idToken, { complete: true });
}
