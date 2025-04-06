import React, { useEffect, useRef, useState } from 'react'
import Block from './components/Block'
import Nest from './components/Nest'

const App = () => {
  const [canva, setCanva] = useState([]);
  const dropAreaRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const dragStart = (e) => {
    const rect = e.target.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.dataTransfer.setData("code", e.target.dataset.code);
  }

  const allowDrop = (e) => {
    e.preventDefault();
  }

  useEffect(()=>{
    console.log(canva)
  },[canva])

  const drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("code");
    const { x, y } = getSnappedPosition(e);
    console.log(`${data} is dropped at x: ${x} and y:${y}.`)
    if (data === 'block') {
      setCanva([...canva,{
        position : {
          x,
          y
        },
        blocks : ['block']
      }])
    }
  }

  function getSnappedPosition(e) {
    const dropArea = dropAreaRef.current;
    if (!dropArea) return { x: 0, y: 0 };
    let rect = dropArea.getBoundingClientRect();
    let x = e.clientX - rect.left - offset.x;
    let y = e.clientY - rect.top - offset.y;

    x = Math.round(Math.max(0, Math.min(x, rect.width - 150)) / 10) * 10;
    y = Math.round(Math.max(0, Math.min(y, rect.height - 40)) / 10) * 10;

    return { x, y };
  }

  const Canva = () => {
    return (
      <>
        {canva.map((c, i) => (
          <div
            key={i}
            style={{
              left: `${c.position.x}px`,
              top: `${c.position.y}px`,
              position: 'absolute',
            }}
          >
            {c.blocks.map((block, j) => {
              if (block === 'block') {
                return <Block key={j} />;
              }
              return null;
            })}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className='flex h-[100vh] w-full bg-gray-200 dark:bg-[#2C2C2C] text-black dark:text-white items-center'>
      <div className='w-1/4 border-black border-1 h-[100vh] flex flex-col gap-5 p-10'>
        <h1>Blocks</h1>
        <Block dragStart={(e) => dragStart(e)} />
        <Nest dragStart={(e) => dragStart(e)} />
      </div>
      <div className='h-200 scroll-smooth w-5/8 border-dashed border-1 rounded-md overflow-scroll'>
        <div
          ref={dropAreaRef}
          className='drop-area p-5 relative min-h-300 bg-gray-500 min-w-300 overflow-auto'
          onDragOver={(e) => allowDrop(e)} onDrop={(e) => drop(e)}>
          <h1>Drop here :</h1>
          <Canva />
        </div>
      </div>
    </div>
  )
}

export default App
