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
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    position: 'relative'
  }

  const leftRowStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'start',
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
      <div style={{display: 'inline-flex', padding: '6px'}}>
        <Card style={{position: 'relative'}}>
          {
            videoPlaying
              ?
              <FaceRecVideo
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
        </Card>
      </div>


      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          maxWidth: '350px',
          padding: '6px',
        }}
      >
        {/* Button panel action area */}
        <div style={{...leftRowStyle, paddingBottom: '12px'}}>
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

        <div style={{...leftRowStyle, paddingBottom: '12px'}}>
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

        <div style={leftRowStyle}>
          <PhotoManager
            photoButtonDisabled={!videoPlaying || loading}
          />
        </div>
      </div>
    </div>
  </>);
}

export default FaceRecVideoPlayer;
