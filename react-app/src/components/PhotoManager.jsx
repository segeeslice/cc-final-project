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
  const [photo, setPhoto] = React.useState([])
  const [photoTaken, setPhotoTaken] = React.useState(false)

  const onTakePhotoClick = () => {
    setPhoto(captureVideoFrame('video', 'png'))
    setPhotoTaken(true)
  }

  return (
    <div>
      <div style={{display: 'flex', padding: '6px', justifyContent: 'center'}}>
        <Card style={{display: 'flex', alignItems: 'center'}}>
          <Typography variant="h6" style={{padding: '0px 12px'}}>
            Take Photo:
          </Typography>
          <IconButton 
            onClick={onTakePhotoClick}
          >
            <CameraAltIcon/>
          </IconButton>
        </Card>
      </div>
      <div>
        {
          photo
            ?
              // The capture worked, so display the photo
              <div>
                {
                  photoTaken
                    ?
                      <div style={{textAlign: 'center'}}>
                        <img 
                          id='photo'
                          src={photo.dataUri} 
                          width='180px'
                          height='140px'
                        />
                        <UploadManager
                          setPhotoTaken={setPhotoTaken}
                          photo={photo}
                        />
                      </div>
                    :
                      null
                }
              </div> 
            :
              // Capture did not work, so display this message to the user
              <h4>Photo not captured properly. Please try again.</h4>
        }
      </div>
    </div>
  )
}

export default PhotoManager