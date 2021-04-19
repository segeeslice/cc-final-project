/*
 * Component that wraps FaceRecVideo to enhance it's functionality
 *
 * Adds control over playback as well as various QoL features, such as loading
 * indicators
 */

import React from 'react'
import FaceRecVideo from './FaceRecVideo'
import FaceRecLoadingOverlay from './FaceRecLoadingOverlay'
import PhotoManager from './PhotoManager'

import {
  IconButton,
  Card,
  Typography,
} from '@material-ui/core'
import PlayIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'

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
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
    position: 'relative'
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
        <Card style={{position: 'relative'}}>
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
                <Typography
                  variant="h4"
                  style={{
                    textShadow: '0px 0px 8px #000000',
                    color: 'white'
                  }}
                >
                  [ Video stopped ]
                </Typography>
              </div>
        }
        </Card>
      </div>

      <div
        style={{
          zIndex: 1000,
          position: 'absolute',
          height: videoHeight,
          width: videoWidth,
          top: 0,
        }}
      >
        <FaceRecLoadingOverlay
          hide={!loading}
        />
      </div>

      {/* Button panel action area */}
      <div style={{...centeredRowStyle, paddingBottom: '12px'}}>
        <Card style={{display: 'flex', padding: '6px', alignItems: 'center'}}>
          <Typography variant="h6" style={{padding: '0px 12px'}}>
            Video Stream:
          </Typography>
          <IconButton
            onClick={onStartVideoClick}
            disabled={loading}
            size="small"
            aria-label="play video stream"
            style={{
              color: !loading && videoPlaying && "green"
            }}
          >
            <PlayIcon/>
          </IconButton>
          <IconButton
            onClick={onStopVideoClick}
            disabled={loading}
            size="small"
            aria-label="stop video stream"
            style={{
              color: !loading && !videoPlaying && "red"
            }}
          >
            <StopIcon/>
          </IconButton>
        </Card>
      </div>

      <div style={{...centeredRowStyle, paddingBottom: '12px'}}>
        <Card style={{display: 'flex', padding: '6px'}}>
          <Typography variant="h6" style={{padding: '0px 12px'}}>
            Facial Recognition:
          </Typography>
          <IconButton
            onClick={onStartRecClick}
            disabled={loading}
            size="small"
            aria-label="play facial recognition box"
            style={{
              color: !loading && recPlaying && "green"
            }}
          >
            <PlayIcon/>
          </IconButton>
          <IconButton
            onClick={onStopRecClick}
            disabled={loading}
            size="small"
            aria-label="stop facial recognition box"
            style={{
              color: !loading && !recPlaying && "red"
            }}
          >
            <StopIcon/>
          </IconButton>
        </Card>
      </div>
      <div style={centeredRowStyle}>
        <PhotoManager
          hide={loading}
        />
      </div>
    </div>
  </>);
}

export default FaceRecVideoPlayer;
