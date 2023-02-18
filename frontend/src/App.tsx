import React, { useRef, useEffect, FC, useState } from 'react';
import './App.css'
// @ts-ignore
import { loadPlayer } from 'rtsp-relay/browser';

interface IProps {
  ip: string
}


const App: React.VFC<IProps> = (props: IProps) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [btnText, setBtnText] = useState('');

  useEffect(() => {
    if (!canvas.current) throw new Error('Ref is null');
    loadPlayer({
      url: `ws://localhost:2000/api/stream/${props.ip}`,
      canvas: canvas.current
    });
  }, []);

  return (
    <div className='canvas'>
      <label htmlFor="">Camera - {props.ip}</label>
      {/* <button onClick={() => {
        if (canvas.current) {
          if (canvas.current.style.display = 'block') {
            canvas.current.style.display = 'none'
          }
          else {
            canvas.current.style.display = 'block'
          }
        }
      }}>Open/Close</button> */}

      <canvas ref={canvas} style={{ display: 'block' }} />
    </div>
  )

}

export default App


