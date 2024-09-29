exports.handler = async function(event, context) {
  const { google } = require('googleapis')
  const { Firestore } = require('@google-cloud/firestore')

  const CLIENT_ID = process.env.OAUTH_CLIENT_ID
  const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET
  const REDIRECT_PATH = '/.netlify/functions/oauth'
  const APP_URL = event.rawUrl.split('/.netlify')[0]

  const sub = event.queryStringParameters.sub

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    APP_URL + REDIRECT_PATH
  );

  const firestore = new Firestore({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT)
  })

  const docRef = firestore.collection('users').doc(sub)
  const tokens = await docRef.get()

  if (new Date().getTime() > tokens.data().tokenExpiresAt) {
    oauth2Client.setCredentials({refresh_token: tokens.data().refreshToken})
    const { credentials } = await oauth2Client.refreshAccessToken()
    docRef.update({
      accessToken: credentials.access_token,
      tokenExpiresAt: credentials.expiry_date
    })
  } else {
  }

  const result = [
    {
      thumbnail: 'https://i.ytimg.com/vi/6670kqCdb8E/hqdefault.jpg',
      title: '【Official Live Video】MyGO!!!!!「迷星叫」（「BanG Dream! Special☆LIVE Girls Band Party! 2020→2022」より）',
      subtitle: '',
    },
    {
      thumbnail: 'https://i.ytimg.com/vi/rBL930dHVkY/hqdefault.jpg',
      title: 'Returns',
      subtitle: '',
    },
    {
      thumbnail: 'https://i.ytimg.com/vi/_CraJ8654Bg/hqdefault.jpg',
      title: '「壱雫空」（アニメ「BanG Dream! It&#39;s MyGO!!!!!」オープニング映像）',
      subtitle: '',
    },
  ]

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}
