import React from 'react'

function FaceRecLoadingOverlay(props) {
  const {
    hide,
    text,
  } = {
    hide: false,
    text: 'Loading...',
    ...props,
  }

  const rootStyle = {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    // backgroundColor: 'rgb(0, 0, 0, .4)'
  }

  return (
    <div style={rootStyle}>
      { hide ||
        <h2
          style={{
            color: 'white',
            padding: '12px',
            margin: '0px',
            textShadow: '0px 0px 8px #000000',
          }}
        >
          { text }
        </h2>
      }
    </div>
  )
}

export default FaceRecLoadingOverlay;
