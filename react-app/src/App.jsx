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
    alignItems: 'center',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  }

  return (<>
    <div style={bodyStyle}>
      <FaceRecVideoPlayer/>
    </div>
  </>);
}

export default App;
