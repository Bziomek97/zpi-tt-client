import { Stack, TextField } from '@fluentui/react'
import Head from 'next/head'

const stackTokens = { childrenGap: 50 };
const stackStyles = { root: { width: 1200, display: 'flex', justifyContent: 'center' }};
const columnProps = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Stack horizontal tokens={stackTokens} styles={stackStyles} horizontalAlign='Center'>
        <Stack {...columnProps}>
          <TextField label="Email"/>
          <TextField
            label="Password"
            type="password"/>
        </Stack>

        <Stack {...columnProps}>
          <TextField label="Name"/>
          <TextField label="Email"/>
          <TextField
            label="Password"
            type="password"/>        
          <TextField
            label="Confirm Password"
            type="password"/>
        </Stack>
      </Stack>
    </div>
  )
}
