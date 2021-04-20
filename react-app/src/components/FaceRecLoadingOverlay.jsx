import React from 'react'
import {
  CircularProgress,
} from '@material-ui/core'

function FaceRecLoadingOverlay(props) {
  const {
    hide,
  } = props

  const rootStyle = {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: !hide && 'rgb(0, 0, 0, .5)',
  }

  return (
    <div style={rootStyle}>
      { hide ||
        <CircularProgress
          style={{
            color: 'white',
            margin: '0px',
          }}
        />
      }
    </div>
  )
}

export default FaceRecLoadingOverlay;
