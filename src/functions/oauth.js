exports.handler = async function(event, context) {
  const {google} = require('googleapis');
  const jwt = require('jsonwebtoken');

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

  if (!!event.queryStringParameters.code) {
    let { tokens } = await oauth2Client.getToken(event.queryStringParameters.code)
    console.log(tokens.access_token)

    const id_token = jwt.decode(tokens.id_token, { complete: true});

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
