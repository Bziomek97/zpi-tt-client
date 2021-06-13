import Router from 'next/router'
import styles from '../styles/home.module.scss'
import { CommandBar, SearchBox, initializeIcons } from '@fluentui/react'
import React from 'react'
import analyzedTweetsPost from '../connector/tweetsConnector'

const stateOfIndex = {
  totalSentiments: {
    polarity: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
    total: 0
  },
  posts: []
}

const stylingValues = {
  positivePercent: (stateOfIndex.totalSentiments.positive / stateOfIndex.totalSentiments.total * 100).toFixed(2),
  negativePercent: (stateOfIndex.totalSentiments.negative / stateOfIndex.totalSentiments.total * 100).toFixed(2),
  neutralPercent: (stateOfIndex.totalSentiments.neutral / stateOfIndex.totalSentiments.total * 100).toFixed(2),
}

let _items = []

let _faritems= [
  {
    key: 'account',
    text: 'Account',
    iconProps: { iconName: 'AccountManagement' },
    subMenuProps: {
      items: [],
    },
  }
];

function redirectToLogin() {
  Router.push('/auth')
}

async function getTags(value, setState, setStyle) {
  const search = value.split(/[, ]+/g).filter(value => value !== '')

  const tweetData = await analyzedTweetsPost(search)

  const total = tweetData.positive + tweetData.negative + tweetData.neutral

  const newStateOfIndex = {
    totalSentiments: {
      polarity: (tweetData.polarity).toFixed(2),
      positive: tweetData.positive,
      negative: tweetData.negative,
      neutral: tweetData.neutral,
      total: total,
    },
    posts: tweetData.twitts
  }

  setState(newStateOfIndex)

  const newStylingValues = {
    positivePercent: (tweetData.positive / total * 100).toFixed(2),
    negativePercent: (tweetData.negative / total * 100).toFixed(2),
    neutralPercent: (tweetData.neutral / total * 100).toFixed(2),
  }

  setStyle(newStylingValues)
}

function generateTweets(state) {
  const jsxPostTags = []

  state.posts.forEach((val,key) => {
    jsxPostTags.push(<div className={styles.post} key={key}> 
      <p className={styles.authorContainer}> {`${val.author.username}'s tweet:`} </p>
      <p className={styles.postContainer}> {val.text} </p>
      <div className={styles.sentimentContainer}> <span style={{backgroundColor: (val.sentiment === -1) ? 'red' : (val.sentiment === 0) ? 'gray' : 'green'}}></span></div>
    </div>)
  })

  return jsxPostTags;
}

function loggedComponent(state, style) {
  const loggedComponent = (
      <>
        <div className={styles.twittAnalysisWrapper}>
            <div className={styles.twittAnalysisStatisticsWrapper}>
              <div className={styles.diagramWrapper}>
                <div className={styles.diagram}>
                  <span style={{backgroundColor: 'green', width: `${(state.totalSentiments.total === 0) ? 0 : style.positivePercent}%`, height: '100%', display: 'inline-block' }}></span>
                  <span style={{backgroundColor: 'red', width: `${(state.totalSentiments.total === 0) ? 0 : style.negativePercent}%`, height: '100%', display: 'inline-block' }}></span>
                  <span style={
                    {backgroundColor: 'rgb(170, 169, 169)',
                    width: `${(state.totalSentiments.total === 0) ? 0 : style.neutralPercent + 5}%`,
                    height: '100%',
                    display: 'inline-block' }
                  }></span>
                </div>
              </div>
              <p>{`Analyzed twitts: ${state.totalSentiments.total}, \
              Positive: ${(state.totalSentiments.total === 0) ? 0 : style.positivePercent}% (${state.totalSentiments.positive}), \
              Negative: ${(state.totalSentiments.total === 0) ? 0 : style.negativePercent}% (${state.totalSentiments.negative}), \
              Neutral: ${(state.totalSentiments.total === 0) ? 0 : style.neutralPercent}% (${state.totalSentiments.neutral}). 
              Polarity ${state.totalSentiments.polarity}%`}</p>
            </div>
          </div>

          <div className={styles.postList}>
            {generateTweets(state)}
          </div>
      </>
    )

    return loggedComponent
}

function notLoggedComponent() {
  const notLoggedComponent= (
    <div className={styles.notLoggedWrapper}>
      Please Login or Register before using website.
    </div>
  )

  return notLoggedComponent;
}

function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    const stickyValue = window.localStorage.getItem(key);

    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue));
    }
  }, [key]);

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default function Home() {
  const [mode, setMode] = useStickyState(false, 'auth');
  const [state, setState] = React.useState(stateOfIndex);
  const [style, setStyle] = React.useState(stylingValues);

  let render = null
  _items = [
    {
      key: 'logo',
      onRender: () => <h2 style={{
        alignSelf: 'center',
        margin: 0,
        paddingRight: 24,
        color: 'rgb(0, 120, 212)'}}>Twitter analysis app</h2>
    }
  ]
  _faritems[0].subMenuProps.items = []

  initializeIcons(undefined, { disableWarnings: true });

  if(!mode) {
    _faritems[0].subMenuProps.items.push({
      key: 'auth',
      text: 'Login/Register',
      onClick: () => {
        redirectToLogin()
      }
    })

    render = notLoggedComponent(state, style)
  } else {
    _items.push(
      {
        key: 'search',
        renderedInOverflow: true,
        onRender: () => <SearchBox className={styles.commandBar} placeholder="Search" onSearch={newValue => 
          getTags(newValue, setState, setStyle)
        } />
      }
    )
    
    _faritems[0].subMenuProps.items.push({
      key: 'logout',
      text: 'Logout',
      onClick: () => {
        setMode(false)
      }
    })

    render = loggedComponent(state, style)
  }

  return (
    <div className={styles.homeWrapper}>
      <div>
        <CommandBar
          style = {{paddingTop: 16}}
          items = {_items}
          farItems={_faritems}
        />

        {render}
      </div>
    </div>
  )
}