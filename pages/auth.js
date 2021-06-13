import { Stack, TextField, PrimaryButton } from '@fluentui/react'
import Head from 'next/head'
import Router from 'next/router'
import styles from '../styles/auth.module.scss'
import React from 'react'
import {registerGet} from '../connector/authConnector'

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

export default class Auth extends React.Component {

  state = {
    login: {
      name: '',
      password: ''
    },
    register: {
      email: '',
      name: '',
      password: '',
      confirmPassword: ''
    }
  }
  
  onChangeEmail(value) {
    this.setState({register: {...this.state.register, email: value}})
  }
  
  onChangePassword(value, isLogin = false) {
    if(isLogin){
      this.setState({ login: {...this.state.login, password: value}})
    } else {
      this.setState({ register: {...this.state.register, password: value}})
    }
  }
  
  onChangeConfirmPassword(value) {
    this.setState({register: {...this.state.register, confirmPassword: value}})
  }
  
  onChangeName(value, isLogin = false) {
    if(isLogin){
      this.setState({login: {...this.state.login, name: value}})
    } else {
      this.setState({register: {...this.state.register, name: value}})
    }
  }
  
  // Auth variables
  redirectToIndex() {
    Router.push('/')
  }

  render() {
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
                      <TextField label="Name" value={this.state.login.name} onChange={(evt) => {this.onChangeName(evt.target.value, true)}}/>
                      <TextField value={this.state.login.password} onChange={(evt) => {this.onChangePassword(evt.target.value, true)}}
                      label="Password"
                      type="password"/>
                      <PrimaryButton {...buttonProps} text="Login" onClick={() => {
                          registerGet(this.state.register)
                          .then(res => {
                            if(res) {
                              window.localStorage.setItem('auth', res)
                              this.redirectToIndex()
                            }
                          }).catch()
                        }}/>
                  </Stack>
                  <div className={styles.boarder}></div>
                  <Stack {...columnProps}>
                      <h2>Register</h2>
                      <p className={styles.authInfo}>If you haven't account, please sign up yourself.</p>
                      <TextField value={this.state.register.name} onChange={(evt) => {this.onChangeName(evt.target.value)}} label="Name"/>
                      <TextField value={this.state.register.email} onChange={(evt) => {this.onChangeEmail(evt.target.value)}} label="Email"/>
                      <TextField value={this.state.register.password} onChange={(evt) => {this.onChangePassword(evt.target.value)}}
                      label="Password"
                      type="password"/>        
                      <TextField value={this.state.register.confirmPassword} onChange={(evt) => {this.onChangeConfirmPassword(evt.target.value)}}
                      label="Confirm Password"
                      type="password"/>
                      <PrimaryButton {...buttonProps} text="Register" onClick={() => {
                        if(res) {
                          registerGet(this.state.register)
                            .then(res => {
                              window.localStorage.setItem('auth', res)
                              this.redirectToIndex()
                            }).catch()
                        }
                        }}/>
                  </Stack>
              </Stack>
          </div>
      </div>
    )
  }
}
