/*
 * Element for running and displaying facial recognition video
 * Prompts the user for a webcam and automatically begins running
 *
 * NOTE: width and height props are REQUIRED for this to function properly
 *       They have to be exact pixel values as well, unfortunately, i.e. not 100%, 50vh, etc.
 *       This is just a limitation of the face-rec.js, as it needs to know how to resize results
 *
 * TODO: Add mechanism to dynamically control when facial recognition starts
 */

import React from 'react'
import {
  startVideo,
  stopVideo,
  loadFaceApiModels,
  startFacialDetection,
  stopFacialDetection,
} from '../face-rec.js'

function FaceRecVideo(props) {
  const {
    referenceImagePaths,
    width,
    height,
  } = props

  const videoRef = React.createRef(null)
  const canvasRef = React.createRef(null)

  const videoEl = (
    <video
      ref={videoRef}
      id="video"
      autoPlay
      muted
      width={width}
      height={height}
      style={{
        position: 'absolute',
      }}
    ></video>
  )

  const canvasEl = (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
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

  // Return resulting video overlayed by canvas
  // Wrapped in relative element so we can treat it as relative
  return (
    <div style={{height: height, width: width, position: 'relative'}}>
      { videoEl }
      { canvasEl }
    </div>
  );
}

export default FaceRecVideo;
