exports.handler = async function(event, context) {
  const { google } = require('googleapis')

  const youtube = google.youtube({
    version: "v3",
    auth: process.env.GOOGLE_API_KEY
  });

  const result = await youtube.search.list({
    q: event.queryStringParameters.q,
    part: ["snippet"],
    relevanceLanguage: "ja",
    type: ["video"],
    maxResults: 10,
  });

  const list = result.data.items

  const response = list.map((video) => ({
    id: video.id.videoId,
    title: video.snippet.title,
    thumbnail: video.snippet.thumbnails.high.url,
    subtitle: video.snippet.description,
    channel: video.snippet.channelTitle
  }))

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}
