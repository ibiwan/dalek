import Head from 'next/head'
import styles from 'styles/Home.module.css'
import React from 'react';
import Game from 'feature/game/Game';
import { Provider } from 'react-redux';
import store from 'app/store';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>More Daleks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <React.StrictMode>
        <Provider store={store}>
          <Game />
        </Provider>
      </React.StrictMode>,
    </div>
  )
}
