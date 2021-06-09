import Head from 'next/head'
import Router from 'next/router'
import styles from '../styles/home.module.scss'
import { CommandBar, SearchBox, initializeIcons } from '@fluentui/react'

function redirectToLogin() {
  Router.push('/auth')
}

function getTags(value) {
  const search = {
    tags: [],
    texts: [],
  }

  search.tags = value.match(/#(\w)+/g)
  search.texts = value.replace(/#(\w)+/g,'').split(/[, ]+/g).filter(value => value !== '')

  console.log(search)
}

export default function Home() {
  initializeIcons(undefined, { disableWarnings: true });

  return (
    <div className={styles.homeWrapper}>
      <Head>
        <title>Analityco</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <div>
        <CommandBar
          style = {{paddingTop: 16}}
          items = {_items}
          farItems={_faritems}
        />
      </div>
    </div>
  )
}

const _items = [
  {
    key: 'logo',
    onRender: () => <h2 style={{alignSelf: 'center', margin: 0, paddingRight: 24, color: 'rgb(0, 120, 212)', fontStyle: 'italic'}}>Twitter analysis app</h2>
  },
  {
    key: 'search',
    renderedInOverflow: true,
    onRender: () => <SearchBox className={styles.commandBar} style={{width: 400}} placeholder="Search" onSearch={newValue => getTags(newValue)} />
  }
]

const _faritems= [
  {
    key: 'account',
    text: 'Account',
    iconProps: { iconName: 'AccountManagement' },
    subMenuProps: {
      items: [
        {
          key: 'auth',
          text: 'Login/Register',
          onClick: () => {redirectToLogin()}
        },
        {
          key: 'logout',
          text: 'Logout',
          onClick: () => {alert('Test')}
        },
      ],
    },
  }
];