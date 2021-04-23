import React, {useState, DragEvent} from 'react'
import classnames from 'classnames';
import Icon from '../Icon/icon'

export interface DragProps {
  onFile: (file: FileList) => void
}

export const Drag: React.FC<DragProps> = (props) => {
  const { onFile, children } = props
  const [dragOver, setDragOver] = useState(false)
  const classes = classnames('drag', {
    'drag-over': dragOver
  })
  // 拖拽放下
  const handleDrop = (e:DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }
  // 拖拽
  const handleDrag = (e: DragEvent, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  return (
    <div 
      className={classes} 
      onDragOver={e => handleDrag(e, true)} 
      onDragLeave={e => handleDrag(e, false)} 
      onDrop={e => handleDrop(e)}>
      <Icon icon="upload" theme="dark" size="3x" />
      {children}
    </div>
  )
}

export default Drag
