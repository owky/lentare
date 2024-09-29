exports.handler = async function(event, context) {
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
