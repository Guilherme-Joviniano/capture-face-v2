import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const openAllCams = () => {
  const allCanvas = document.querySelectorAll('canvas');
  allCanvas.forEach(canvas => {
    canvas.style.display = 'block'
  })
}

const closeAllCams = () => {
  const allCanvas = document.querySelectorAll('canvas');
  allCanvas.forEach(canvas => {
    canvas.style.display = 'none'
  })
}


root.render(
  <React.StrictMode>
    <div>
      <h1>Monitoramento das Cameras 📷</h1>
      <div className='button-wrapper'>
        <button onClick={openAllCams}>Ver todas as Cameras</button>
        <button onClick={closeAllCams}>Fechar todas</button>
      </div>

    </div>
    <div className='videos-wrapper'>
      <App ip='192.168.1.104'></App>
      <App ip='192.168.1.104'></App>
      <App ip='192.168.1.104'></App>
      <App ip='192.168.1.104'></App>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
