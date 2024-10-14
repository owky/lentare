const { Firestore } = require('@google-cloud/firestore')

const firestore = new Firestore({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT)
})

exports.handler = async function(event, context) {
  let status = null
  let responseBody = {}

  const sub = event.queryStringParameters.sub
  const refCur = firestore.collection('current').doc(sub)
  const refHis = firestore.collection('history').doc(sub)

  switch (event.httpMethod) {
    case 'GET':
      const cur = (await refCur.get())?.data()
      const his = (await refHis.get())?.data()?.list || []
      if (cur) { his.unshift(cur) }
      responseBody = {
        history: his
      }
      status = 200
      break
    case 'POST':
      const video = JSON.parse(event.body).video
      const current = (await refCur.get()).data()
      let history = (await refHis.get()).data()?.list || []
      if (current) history.unshift(current)
      history = history.filter((e) => e.id != video.id)

      await refCur.set(video)
      await refHis.set({list: history})

      status = 201
      respoinseBody = {}
      break
    default:
      status = 404
      responseBody = {message: 'Not Found'}
  }

  return {
    statusCode: status,
    body: JSON.stringify(responseBody)
  }
}