import { Stack, TextField, PrimaryButton } from '@fluentui/react'
import Head from 'next/head'
import Router from 'next/router'
import styles from '../styles/auth.module.scss'

// Fluent styling component
const stackTokens = { childrenGap: 50 };
const stackStyles = { root: { width: '100vw', padding: '16px 0 0 0'}};
const columnProps = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 400 } },
};
const buttonProps = {
    styles: { root: { width: 100 }}
}

// Auth variables
function redirectToIndex() {
    Router.push('/')
  }
  

export default function Auth() {
  return (
    <div className={styles.authWrapper}>
        <Head>
        <title>Twitter Analysis App</title>
        <link rel="icon" href="/favicon.ico"/>
        </Head>

        <div className={styles.loginWrapper}>
            <Stack horizontal tokens={stackTokens} styles={stackStyles} horizontalAlign='Center'>
                <Stack {...columnProps}>
                    <h2>Login</h2>
                    <p className={styles.authInfo}>If you have account, please sign in yourself.</p>
                    <TextField label="Email"/>
                    <TextField
                    label="Password"
                    type="password"/>
                    <PrimaryButton {...buttonProps} text="Login" onClick={() => {redirectToIndex()}}/>
                </Stack>
                <div className={styles.boarder}></div>
                <Stack {...columnProps}>
                    <h2>Register</h2>
                    <p className={styles.authInfo}>If you haven't account, please sign up yourself.</p>
                    <TextField label="Name"/>
                    <TextField label="Email"/>
                    <TextField
                    label="Password"
                    type="password"/>        
                    <TextField
                    label="Confirm Password"
                    type="password"/>
                    <PrimaryButton {...buttonProps} text="Register" onClick={() => {redirectToIndex()}}/>
                </Stack>
            </Stack>
        </div>
    </div>
  )
}
