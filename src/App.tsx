import React from 'react'
import Slide from './components/slide'

const App = React.memo(() => {
  return (
    <div>
      <Slide number={1} />
    </div>
  )
})

export default App
