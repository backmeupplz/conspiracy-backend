import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog } from 'frog'
import { devtools } from 'frog/dev'
import { neynar } from 'frog/hubs'
import env from './helpers/env'
import runMongo from './helpers/mongo'

export const app = new Frog({
  // hub: neynar({ apiKey: env.NEYNAR_API_KEY }),
})

app.frame('/', (c) => {
  const { buttonValue, status } = c
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `69 nice`
            : 'Y🤫u h🤫v🤫 1🤫🤫🤫-1🤫🤫🤫🤫 $🤫! Cl🤫im bel🤫w.'}
        </div>
      </div>
    ),
    intents: [<Button value="apples">Ch🤫ck $🤫🤫🤫!</Button>],
  })
})

console.log(`Server is running on port ${env.PORT}`)

devtools(app, { serveStatic })

serve({
  fetch: app.fetch,
  port: env.PORT,
})

runMongo()
