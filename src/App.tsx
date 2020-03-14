import React from 'react'
import Slide from './components/slide'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'

interface Indexes {
  oldIndex: number
  newIndex: number
}

interface SortableItemProps {
  value: number
}

interface SortableListProps {
  items: number[]
}

const SortableItem = SortableElement((props: SortableItemProps) => (
  <Slide number={props.value} />
))

const SortableList = SortableContainer((props: SortableListProps) => {
  return (
    <div>
      {props.items.map((value: number, index: number) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </div>
  )
})

const App = React.memo(() => {
  const [state, setState] = React.useState([1, 2, 3, 4, 5, 6])

  const onSortEnd = ({ oldIndex, newIndex }: Indexes) => {
    setState(state => arrayMove(state, oldIndex, newIndex))
  }

  return <SortableList items={state} onSortEnd={onSortEnd} />
})

export default App
