import React from 'react'
import captureVideoFrame from 'capture-video-frame'
import UploadManager from './UploadManager'

function PhotoManager(props) {
  const [photo, setPhoto] = React.useState([])
  const [photoTaken, setPhotoTaken] = React.useState(false)

  const onTakePhotoClick = () => {
    setPhoto(captureVideoFrame('video', 'png'))
    setPhotoTaken(true)
  }

  return (
    <div>
      <div>
        <span style={{padding: '0px 12px'}}>
          Capture Face:
        </span>
        <button 
          onClick={onTakePhotoClick}
        >
          Take Photo
        </button>
      </div>
      <div>
        {
          photo
            ?
              // The capture worked, so display the photo
              <div>
                <img id='photo' src={photo.dataUri} />
                {
                  photoTaken
                    ?
                      <UploadManager
                        photo={photo}
                      />
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