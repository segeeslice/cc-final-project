/*
 * Element for running and displaying facial recognition video
 * Prompts the user for a webcam and automatically begins running
 *
 * NOTE: width and height props are REQUIRED for this to function properly
 *       They have to be exact pixel values as well, unfortunately, i.e. not 100%, 50vh, etc.
 *       This is just a limitation of the face-rec.js, as it needs to know how to resize results
 */

import React from 'react'
import {
  startVideo,
  stopVideo,
  loadFaceApiModels,
  startFacialDetection,
  stopFacialDetection,
} from '../face-rec.js'

// Global "detect object", which is returned from startFacialRecognition
// Allows for easy use of stopFacialRecognition between renders
let detectObj = null

const defaultProps = {
    referenceImagePaths: [],
    width: '720px',
    height: '560px',
    videoPlaying: false,
    recPlaying: false,
    onLoadingChange: (loadingVal) => {},
}

function FaceRecVideo(props) {
  const {
    referenceImagePaths,
    width,
    height,
    videoPlaying,
    recPlaying,
    onLoadingChange,
  } = { ...defaultProps, ...props }

  const videoRef = React.createRef(null)
  const canvasRef = React.createRef(null)

  // const videoEl = <VideoElMemo videoRef={videoRef} height={height} width={width}/>
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
        // Canvas clearing can hit timing issue with the interval, leaving a lingering box
        // Just in case canvas doesn't stop in time, put the video in front of it to hide it
        zIndex: recPlaying ? -1 : 1,
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

  // Event handling for recPlaying
  React.useEffect(() => {
    const currVideoRef = videoRef.current
    const currCanvasRef = canvasRef.current

    if (videoPlaying && recPlaying) {
      // Notify parent we're loading
      onLoadingChange(true)

      // Load AI models
      loadFaceApiModels()
        .then(async() => {
          detectObj = await startFacialDetection(currVideoRef, {
            referenceImagePaths,
            canvas: currCanvasRef,
          })

          // Notify parent we're finished
          onLoadingChange(false)
        })
        .catch((e) => {
          console.log("Could not load face-api models")
          console.error(e)
        })
    } else if (detectObj) {
      stopFacialDetection(detectObj)
      detectObj = null
    }

    // Upon destroying the page, stop facial detection interval
    return () => {
      if (detectObj) {
        stopFacialDetection(detectObj)
        detectObj = null
      }
    }
  }, [videoPlaying, recPlaying, videoRef, canvasRef, referenceImagePaths, onLoadingChange])

  // Event handling for videoPlaying
  React.useEffect(() => {
    const currVideoRef = videoRef.current

    if (videoPlaying) {
      startVideo(videoRef.current)
    } else {
      stopVideo(videoRef.current)
    }

    // Upon destroying the page, stop the video streaming
    return () => {
      if (currVideoRef) stopVideo(currVideoRef)
    }
  }, [videoPlaying, videoRef])

  // Return resulting video overlayed by canvas
  // Wrapped in relative element so we can treat it as relative
  return (
    <div style={{height: height, width: width, position: 'relative'}}>
      { videoEl }
      { canvasEl }
    </div>
  );
}

// Use a memoized version of FaceRecVideo to ensure to useless re-renders
//
// This is generally necessary because of this component's reliance on useEffect
// renders, which can rapidly attempt starting facial recognition if we're not
// careful
//
// As such, export this as the default as well
const FaceRecVideoMemo = React.memo(FaceRecVideo)

export default FaceRecVideoMemo;
