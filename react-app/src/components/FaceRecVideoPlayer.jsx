/*
 * Component that wraps FaceRecVideo to enhance it's functionality
 *
 * Adds control over playback as well as various QoL features, such as loading
 * indicators
 */

import React from 'react'
import FaceRecVideo from './FaceRecVideo'
import FaceRecLoadingOverlay from './FaceRecLoadingOverlay'

//  Temporarily utilize hard-coded test images
const referenceImagePaths = [
  './images/Seg.png',
  './images/Dustin.jpg',
  './images/Mo.png'
]

function FaceRecVideoPlayer(props) {
  const [videoWidth, ] = React.useState('720px')
  const [videoHeight, ] = React.useState('560px')
  const [videoPlaying, setVideoPlaying] = React.useState(true)
  const [recPlaying, setRecPlaying] = React.useState(false)

  const [loading, setLoading] = React.useState(false)

  const rootStyle = {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
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
    setVideoPlaying(true)
    setRecPlaying(true)
  }
  const onStopRecClick = () => {
    setRecPlaying(false)
  }

  const onLoadingChange = React.useCallback((val) => {
    setLoading(val)
  }, [setLoading])

  return (<>
    <div style={rootStyle}>
      {/* Video playback */}
      <div style={{...centeredRowStyle, paddingBottom: '12px'}}>
        {
          videoPlaying
            ?
              <FaceRecVideo
                referenceImagePaths={referenceImagePaths}
                height={videoHeight}
                width={videoWidth}
                videoPlaying={videoPlaying}
                recPlaying={recPlaying}
                onLoadingChange={onLoadingChange}
              />
            :
              <div
                style={{
                  height: videoHeight,
                  width: videoWidth,
                  backgroundColor: 'gray',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <h2>
                  Video not playing!
                </h2>
              </div>
        }
      </div>

      <div
        style={{
          zIndex: 1000,
          position: 'absolute',
          height: videoHeight,
          width: videoWidth,
        }}
      >
        <FaceRecLoadingOverlay
          hide={!loading}
        />
      </div>

      {/* Button panel action area */}
      <div style={{...centeredRowStyle, paddingBottom: '12px'}}>
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

export default FaceRecVideoPlayer;
