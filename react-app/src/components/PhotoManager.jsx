import React from 'react'
import captureVideoFrame from 'capture-video-frame'
import UploadManager from './UploadManager'

import {
  IconButton,
  Card,
  Typography,
} from '@material-ui/core'
import CameraAltIcon from '@material-ui/icons/CameraAlt'

function PhotoManager(props) {
  const {
    photoButtonDisabled
  } = props

  const [photo, setPhoto] = React.useState(null)
  const photoTaken = photo != null

  const onTakePhotoClick = () => {
    setPhoto(captureVideoFrame('video', 'png'))
  }

  return (
    <Card>
      <div style={{display: 'flex', padding: '6px', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Typography variant="h6" style={{padding: '0px 12px'}}>
            Take Photo:
          </Typography>
          <IconButton 
            onClick={onTakePhotoClick}
            size="small"
            disabled={photoButtonDisabled}
          >
            <CameraAltIcon/>
          </IconButton>
        </div>
      </div>
      <div>
        {
          photoTaken
            ?
              // The capture worked, so display the photo
              <>
                <hr style={{margin: 0, padding: 0}}/>
                <div style={{padding: '6px'}}>
                  {
                    photo
                      ?
                        <div style={{textAlign: 'center'}}>
                          <img
                            id='photo'
                            src={photo.dataUri}
                            width='180px'
                            height='140px'
                          />
                          <UploadManager
                            onUpload={() => setPhoto(null)}
                            photo={photo}
                          />
                        </div>
                      :
                        <p style={{padding: '12px', paddingTop: '0px', margin: '0px'}}>
                        <strong>Photo not captured properly. Please try again.</strong>
                        </p>
                  }
                </div>
              </>
          :
            null
        }
      </div>
    </Card>
  )
}

export default PhotoManager
