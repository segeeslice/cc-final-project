import React from 'react'
import './App.css';
import FaceRecVideoPlayer from './components/FaceRecVideoPlayer'

function App() {
  const bodyStyle = {
    margin: 0,
    padding: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  }

  return (<>
    <div style={bodyStyle}>
      <div>
        <FaceRecVideoPlayer/>
      </div>
    </div>
  </>);
}

export default App;
