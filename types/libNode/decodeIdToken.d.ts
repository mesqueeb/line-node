export declare type DecodedIdToken = {
    header: {
        typ: 'JWT';
        alg: 'HS256';
    };
    payload: {
        /**
         * https://access.line.me. URL where the ID token is generated.
         */
        iss: 'https://access.line.me' | string;
        /**
         * User ID for which the ID token is generated
         */
        sub: string;
        /**
         * Channel ID
         */
        aud: string;
        /**
         * The expiry date of the token in UNIX time.
         */
        exp: number;
        /**
         * Time when the ID token was generated in UNIX time.
         */
        iat: number;
        /**
         * (Optional) Time when the user was authenticated in UNIX time. Not included if the max_age parameter wasn't specified in the authorization request.
         */
        auth_time?: number;
        /**
         * (Optional) The nonce value specified in the authorization URL. Not included if the nonce value was not specified in the authorization request.
         */
        nonce?: string;
        /**
         * List of authentication methods used by the user. For each authentication method, see Authentication process. One of:
         * pwd: Log in with email and password
         * lineautologin: LINE automatic login (including through LINE SDK)
         * lineqr: Log in with QR code
         * linesso: Log in with single sign-on
         */
        amr: ('pwd' | 'lineautologin' | 'lineqr' | 'linesso' | 'name')[];
        /**
         * User's display name. Not included if the profile scope was not specified in the authorization request.
         */
        name: string;
        /**
         * (Optional) User's profile image URL. Not included if the profile scope was not specified in the authorization request.
         */
        picture?: string;
        /**
         * (Optional) User's email address. Not included if the email scope was not specified in the authorization request.
         */
        email?: string;
    };
    signature: string;
};
/**
 * (Node only) Returns a decoded LINE id token. Uses the nodeJS 'jsonwebtoken' dependency.
 * This id Token should be validated!
 * LINE documentation: https://developers.line.biz/en/docs/line-login/integrate-line-login/#decode-and-validate-id-token
 */
export declare function decodeIdToken(idToken: string): DecodedIdToken;
