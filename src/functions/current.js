const { Firestore } = require('@google-cloud/firestore')

const firestore = new Firestore({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT)
})

exports.handler = async function(event, context) {
  console.log(event)
  console.log(JSON.parse(event.body))

  if (event.httpMethod != 'PUT') {
    return { statusCode: 404, body: "Not Found." }
  }

  const sub = event.queryStringParameters.sub
  const video = JSON.parse(event.body).video
  const refCur = firestore.collection('current').doc(sub)

  refCur.update(video)

  return { statusCode: 201, body: "Update successfully." }
}