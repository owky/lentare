exports.handler = async function(event, context) {
  const { google } = require('googleapis')
  const { Firestore } = require('@google-cloud/firestore')
  const jwt = require('jsonwebtoken')

  const CLIENT_ID = process.env.OAUTH_CLIENT_ID
  const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET
  const REDIRECT_PATH = '/.netlify/functions/oauth'
  const SCOPES = 'openid https://www.googleapis.com/auth/youtube.readonly'
  const appUrl = event.rawUrl.split('/.netlify')[0]

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    appUrl + REDIRECT_PATH
  );

  const firestore = new Firestore({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT)
  })

  if (!!event.queryStringParameters.code) {
    let { tokens } = await oauth2Client.getToken(event.queryStringParameters.code)
    const id_token = jwt.decode(tokens.id_token, { complete: true});

    const docRef = firestore.collection('users').doc(id_token.payload.sub)
    docRef.update({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      tokenExpiresAt: tokens.expiry_date,
    })

    return {
      statusCode: 302,
      headers: { Location: appUrl + "?sub=" + id_token.payload.sub }
    }
  } else {
    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    return {
      statusCode: 302,
      headers: { Location: authorizationUrl }
    }
  }
}
