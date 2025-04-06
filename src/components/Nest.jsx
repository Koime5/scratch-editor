import React from 'react'

const Nest = ({ className,dragStart }) => {
  return (
    <div>
      <div draggable 
      onDragStart={dragStart}
      className={`bg-amber-300 rounded-md w-fit p-2 cursor-grab active:cursor-grabbing border-gray-600 border-1 text-black ${className}`}
      data-code='nesting'>
      <p>This is nesting.</p>
    </div>
    </div>
  )
}

export default Nest
