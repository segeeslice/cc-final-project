import React from 'react'
import './App.css';
import FaceRecVideo from './components/FaceRecVideo'

//  Temporarily utilize hard-coded test images
const referenceImagePaths = [
  './images/Seg.png',
  './images/Dustin.jpg',
  './images/Mo.png'
]

function App() {
  const [videoPlaying, setVideoPlaying] = React.useState(true)
  const [recPlaying, setRecPlaying] = React.useState(false)

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

  const centeredRowStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const onStartVideoClick = () => {
    setVideoPlaying(true)
  }
  const onStopVideoClick = () => {
    setVideoPlaying(false)
    setRecPlaying(false)
  }

  const onStartRecClick = () => {
    setRecPlaying(true)
  }
  const onStopRecClick = () => {
    setRecPlaying(false)
  }

  return (<>
    <div style={bodyStyle}>
      <div style={centeredRowStyle}>
        <FaceRecVideo
          referenceImagePaths={referenceImagePaths}
          height="560px"
          width="720px"
          videoPlaying={videoPlaying}
          recPlaying={recPlaying}
        />
      </div>
      <div style={centeredRowStyle}>
        <span style={{padding: '0px 12px'}}>
          Video Stream:
        </span>
        <button onClick={onStartVideoClick}>
          Start
        </button>
        <button onClick={onStopVideoClick}>
          Stop
        </button>
      </div>
      <div style={centeredRowStyle}>
        <span style={{padding: '0px 12px'}}>
          Facial Recognition:
        </span>
        <button onClick={onStartRecClick}>
          Start
        </button>
        <button onClick={onStopRecClick}>
          Stop
        </button>
      </div>
    </div>
  </>);
}

export default App;
