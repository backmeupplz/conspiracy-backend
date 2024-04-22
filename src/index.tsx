import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import env from './helpers/env'
import runMongo from './helpers/mongo'
import Wrapper from './components/Wrapper'
import { DrawModel } from './models/Draw'

export const app = new Frog({
  // hub: neynar({ apiKey: env.NEYNAR_API_KEY }),
})

app.frame('/', (c) => {
  return c.res({
    action: '/check',
    image: <Wrapper>Y🤫u h🤫v🤫 1🤫🤫🤫-1🤫🤫🤫🤫 $🤫! Cl🤫im bel🤫w.</Wrapper>,
    intents: [<Button value="check">Ch🤫ck $🤫🤫🤫!</Button>],
  })
})

app.frame('/check', async (c) => {
  if (!c.verified)
    return c.res({
      image: <Wrapper>Y🤫u h🤫v🤫 t🤫 b🤫 v🤫rifi🤫d t🤫 d🤫 this.</Wrapper>,
    })
  const fid = c.frameData?.fid
  if (!fid)
    return c.res({
      image: <Wrapper>Y🤫u n🤫🤫d t🤫 pr🤫vid🤫 y🤫ur fid.</Wrapper>,
    })
  let draw = await DrawModel.findOne({ fid })
  if (!draw) {
    draw = await DrawModel.create({
      fid,
      amount: Math.floor(Math.random() * 9000) + 1000,
    })
  }
  return c.res({
    image: (
      <Wrapper>
        Welcome fid {fid}! You've got {draw.amount} to claim.
      </Wrapper>
    ),
    intents: [<Button.Reset>Start over!</Button.Reset>],
  })
})

console.log(`Server is running on port ${env.PORT}`)

devtools(app, { serveStatic })

await runMongo()

serve({
  fetch: app.fetch,
  port: env.PORT,
})
