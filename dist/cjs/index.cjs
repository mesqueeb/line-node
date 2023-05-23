'use strict';

const got = require('got');
const jwt = require('jsonwebtoken');

function randomString(length = 20) {
  return Array(length).fill(0).map(() => Math.random().toString(36).charAt(2)).join("");
}

function getLineLoginUrl(params) {
  const {
    response_type = "code",
    state = randomString(),
    scope = "openid",
    redirect_uri: _redirect_uri
  } = params;
  const redirect_uri = _redirect_uri.replace(/:/g, "%3A").replace(/\//g, "%2F");
  const paramsObject = { ...params, response_type, redirect_uri, state, scope };
  const query = Object.entries(paramsObject).map((entry) => entry.join("=")).join("&");
  return `https://access.line.me/oauth2/v2.1/authorize?${query}`;
}

function getParamsFromLoginCallback(callbackUrlTriggered) {
  const query = callbackUrlTriggered.split("?")[1];
  const queryEntries = query.split("&").map((q) => q.split("="));
  const queryObject = Object.fromEntries(queryEntries);
  return queryObject;
}

const post = got.post;
async function issueAccessToken(params) {
  const { grant_type = "authorization_code", code, redirect_uri, client_id, client_secret } = params;
  if (!code || !redirect_uri || !client_id || !client_secret) {
    throw new Error("Missing information in params");
  }
  const form = { grant_type, code, redirect_uri, client_id, client_secret };
  const response = await post("https://api.line.me/oauth2/v2.1/token", {
    form,
    responseType: "json"
  });
  const { body } = response;
  return body;
}

const { decode } = jwt;
function decodeIdToken(idToken) {
  return decode(idToken, { complete: true });
}

exports.decodeIdToken = decodeIdToken;
exports.getLineLoginUrl = getLineLoginUrl;
exports.getParamsFromLoginCallback = getParamsFromLoginCallback;
exports.issueAccessToken = issueAccessToken;
