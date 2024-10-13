const { Firestore } = require('@google-cloud/firestore')

const firestore = new Firestore({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT)
})

exports.handler = async function(event, context) {
  let status = null
  let message = null

  const params = JSON.parse(event.body)
  const sub = params.sub
  const video = params.video

  const refCur = firestore.collection('current').doc(sub)
  const refHis = firestore.collection('history').doc(sub)

  switch (event.httpMethod) {
    case 'POST':
      const current = (await refCur.get()).data()
      let history = (await refHis.get()).data()?.list || []
      if (current) history.unshift(current)
      history = history.filter((e) => e.id != video.id)

      await refCur.set(video)
      await refHis.set({list: history})

      status = '201'
      message = ''
      break
    default:
      status = '404'
      message = 'Not Found'
  }

  return {
    statusCode: status,
    body: JSON.stringify({message: message})
  }
}