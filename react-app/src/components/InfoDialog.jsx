import React from 'react'
import {
  AppBar,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'

function InfoDialog (props) {
  const {
    onClose,
  } = props

  return (
    <Dialog
      {...props}
    >
      <AppBar position="static" style={{width: '100%', display: 'flex', justify: 'space-between'}}>
        <Toolbar style={{padding: '8px 16px'}}>
        <Typography variant="h5" style={{display: 'inline-flex', alignItems: 'center', flexGrow: 1}}>
          Info
        </Typography>

          <IconButton onClick={onClose} style={{color: 'white'}}>
            <ClearIcon fontSize="large"/>
          </IconButton>
        </Toolbar>
      </AppBar>

      <div style={{padding: '16px'}}>
      <Typography variant="body1">
        Welcome to the <strong>Live Facial Recognition</strong> application, a
        place where you can see playback of your webcam with facial recognition
        tracking in real time.

        <br/><br/>

        As we spend more and more time in video chats these days, it can become
        increasingly difficult for people with cognitive and facial recognition
        disabilities like <strong>prosopagnosia</strong> to deal with the online
        world. As such, this site is intended to be a <strong>proof-of-concept</strong> application,
        showcasing one possible way to increase the accessibility of the online
        world.

        <br/><br/>

        This app was created by <strong>Dustin Seger and Jake Steuver</strong> as
        a final project for their Spring 2021 Cloud Computing course.
      </Typography>

      <hr style={{margin: '18px 0px'}}/>

      <Typography variant="caption">

        The main icon for this site was made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>

        <br/>

        Core facial recognition logic imported from <a href="https://github.com/justadudewhohacks/face-api.js/">face-api.js</a>

        <br/>

        Source code for this site can be found on <a href="https://github.com/segeeslice/cc-final-project">GitHub</a>

      </Typography>
      </div>
    </Dialog>
  )
}

export default InfoDialog
