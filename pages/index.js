import Router from 'next/router'
import styles from '../styles/home.module.scss'
import { CommandBar, SearchBox, initializeIcons } from '@fluentui/react'

const testing = {
  total: {
    positive: 10,
    negative: 6,
    neutral: 1
  },
  posts: [
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: -1
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: 0
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: 1
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: -1
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: 0
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: 1
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: -1
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: 0
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: 1
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: -1
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: 0
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: 1
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: -1
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: 0
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: 1
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: -1
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: 0
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: 1
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: -1
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: 0
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: 1
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: -1
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: 0
    },
    {
      author: 'Adam',
      post: 'ale fajny post \ntest',
      sentiment: 1
    },
  ]
}

const total = testing.total.positive + testing.total.negative + testing.total.neutral;

const valuesToDiagram = {
  positivePercent: (testing.total.positive / total * 100).toFixed(2),
  negativePercent: (testing.total.negative / total * 100).toFixed(2),
  neutralPercent: (testing.total.neutral / total * 100).toFixed(2),
}


function redirectToLogin() {
  Router.push('/auth')
}

function getTags(value) {
  const search = value.split(/[, ]+/g).filter(value => value !== '')
}

function generateTweets() {
  const jsxPostTags = []

  testing.posts.forEach((val,key) => {
    jsxPostTags.push(<div className={styles.post} key={key}> 
      <p className={styles.authorContainer}> {`${val.author}'s tweet:`} </p>
      <div className={styles.postContainer}> {val.post} </div>
      <div className={styles.sentimentContainer}> <span style={{backgroundColor: (val.sentiment === -1) ? 'red' : (val.sentiment === 0) ? 'gray' : 'green'}}></span></div>
    </div>)
  })

  return jsxPostTags;
}

export default function Home() {
  initializeIcons(undefined, { disableWarnings: true });

  return (
    <div className={styles.homeWrapper}>
      <div>
        <CommandBar
          style = {{paddingTop: 16}}
          items = {_items}
          farItems={_faritems}
        />

        <div className={styles.twittAnalysisWrapper}>
          <div className={styles.twittAnalysisStatisticsWrapper}>
            <div className={styles.diagramWrapper}>
              <div className={styles.diagram}>
                <span style={{backgroundColor: 'green', width: `${valuesToDiagram.positivePercent}%`, height: '100%', display: 'inline-block' }}></span>
                <span style={{backgroundColor: 'red', width: `${valuesToDiagram.negativePercent}%`, height: '100%', display: 'inline-block' }}></span>
                <span style={{backgroundColor: 'rgb(170, 169, 169)', width: `${((testing.total.neutral / total * 100) + 10).toFixed(2)}%`, height: '100%', display: 'inline-block' }}></span>
              </div>
            </div>
            <p>{`Analyzed twitts: ${total}, \
            Positive: ${valuesToDiagram.positivePercent}% (${testing.total.positive}), \
            Negative: ${valuesToDiagram.negativePercent}% (${testing.total.negative}), \
            Neutral: ${valuesToDiagram.neutralPercent}% (${testing.total.neutral}).`}</p>
          </div>
        </div>

        <div className={styles.postList}>
          {generateTweets()}
        </div>

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
    onRender: () => <SearchBox className={styles.commandBar} placeholder="Search" onSearch={newValue => getTags(newValue)} />
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