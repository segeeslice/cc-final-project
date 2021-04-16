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

  const onStartClick = () => {
    setRecPlaying(true)
  }
  const onStopClick = () => {
    setRecPlaying(false)
  }

  return (<>
    <div style={bodyStyle}>
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems:' center',
      }}>
        <FaceRecVideo
          referenceImagePaths={referenceImagePaths}
          height="560px"
          width="720px"
          videoPlaying={videoPlaying}
          recPlaying={recPlaying}
        />
      </div>
      <div>
        <button onClick={onStartClick}>
          Start
        </button>
        <button onClick={onStopClick}>
          Stop
        </button>
      </div>
    </div>
  </>);
}

export default App;
