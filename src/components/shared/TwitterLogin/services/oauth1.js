import { requestTokenSignature, accessTokenSignature } from './signature'

const parseOAuthRequestToken = (responseText) =>
  responseText.split('&').reduce((prev, el) => {
    const [key, value] = el.split('=')
    return { ...prev, [key]: value }
  }, {})

export const obtainOauthRequestToken = async ({
  consumerKey,
  consumerSecret,
  callbackUrl,
  method,
  apiUrl
}) => {
  const oauthSignature = requestTokenSignature({
    method,
    apiUrl,
    callbackUrl,
    consumerKey,
    consumerSecret
  })
  const res = await fetch(apiUrl, {
    method,
    headers: {
      Authorization: `OAuth ${oauthSignature}`
    }
  })
  const responseText = await res.text()
  return parseOAuthRequestToken(responseText)
}

export const obtainOauthAccessToken = async ({
  consumerKey,
  consumerSecret,
  oauthToken,
  oauthVerifier,
  method,
  apiUrl
}) => {
  const oauthSignature = accessTokenSignature({
    method,
    apiUrl,
    consumerKey,
    consumerSecret,
    oauthToken,
    oauthVerifier
  })
  const res = await fetch(apiUrl, {
    method,
    headers: {
      Authorization: `OAuth ${oauthSignature}`
    }
  })
  const responseText = await res.text()
  return parseOAuthRequestToken(responseText)
}
