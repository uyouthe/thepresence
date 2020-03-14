import React from 'react'
import styles from './styles.module.css'

interface Props {
  number: number
}

export default React.memo((props: Props) => {
  return <div className={styles.root}>{props.number}</div>
})
