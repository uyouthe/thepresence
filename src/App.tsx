import React from 'react'
import styles from './styles.module.css'
import Root from './components/root'

const App = React.memo(() => {
  return (
    <div className={styles.root}>
      <Root />
    </div>
  )
})

export default App
