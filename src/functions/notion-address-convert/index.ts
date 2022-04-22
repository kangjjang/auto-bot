import { WebClient } from '@slack/web-api'

const slack = new WebClient(process.env.SLACK_BOT_TOKEN)

export const handler = async (event:any) => {
  console.log('notion-address-convert')

  const req = JSON.parse(event.body)
  console.log(req)

  try {
    if(req.event.text.includes('https://www.notion.so')){
      let newStr = req.event.text.replace('https://www.notion.so', 'notion://www.notion.so')
      //console.log(newStr)
      await slack.chat.postMessage(
        {
          channel: req.event.channel,
          thread_ts: req.event.ts.toString(),
          text : newStr
        }
      )
    }
  }catch (e){
    console.error(e)
  }finally {
    return {
      statusCode: 200,
      body: JSON.stringify(req)
    }
  }

}
