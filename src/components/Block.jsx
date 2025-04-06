import React from 'react'

const Block = ({ dragStart,style }) => {
  return (
    <div draggable 
    onDragStart={dragStart}
    style={style}
      className={`bg-amber-300 rounded-md w-fit p-2 cursor-grab active:cursor-grabbing border-gray-600 border-1 text-black`}
      data-code='block'>
      <p>This is a block.</p>
    </div>
  )
}

export default Block
