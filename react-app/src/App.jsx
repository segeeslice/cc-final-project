import React from 'react'
import './App.css';
import {
  startVideo,
  stopVideo,
  loadFaceApiModels,
  startFacialDetection,
  stopFacialDetection,
} from './face-rec.js'

//  Temporarily utilize hard-coded test images
const referenceImagePaths = [
  './images/Seg.png',
  './images/Dustin.jpg',
  './images/Mo.png'
]

function App() {
  const videoRef = React.createRef(null)
  const canvasRef = React.createRef(null)

  const videoEl = (
    <video
      ref={videoRef}
      id="video"
      width="720"
      height="560"
      autoPlay
      muted
    ></video>
  )

  const canvasEl = (
    <canvas
      ref={canvasRef}
      width="720"
      height="560"
      style={{
        position: 'absolute',
      }}
    ></canvas>
  )

  // Upon rendering the page...
  React.useEffect(() => {
    let detectObj = null
    const currVideoRef = videoRef.current
    const currCanvasRef = canvasRef.current

    // Load AI models
    loadFaceApiModels()
      .then(() => {
        // Start the video playback
        startVideo(currVideoRef)

        // Once we're sure the video element is ready and playing,
        // launch facial detection
        // NOTE: This line can add multiple event listeners in development,
        //       which may be fixable by removing event listeners first
        videoRef.current.addEventListener('play', async () => {
          detectObj = await startFacialDetection(currVideoRef, {
            referenceImagePaths,
            canvas: currCanvasRef,
          })
        })
      })
      .catch((e) => {
        console.log("Could not load face-api models")
        console.error(e)
      })

    // Upon destroying the page, stop current streams and intervals
    // Note that this still doesn't particularly like multiple dev reloads but
    // oh well
    return () => {
      if (currVideoRef) stopVideo(currVideoRef)
      if (detectObj) stopFacialDetection(detectObj)
    }
  })

  const bodyStyle = {
    margin: 0,
    padding: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  }

  return (<>
    <div style={bodyStyle}>
      { videoEl }
      { canvasEl }
    </div>
  </>);
}

export default App;
