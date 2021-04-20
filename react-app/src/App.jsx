import React from 'react'
import './App.css';
import FaceRecVideoPlayer from './components/FaceRecVideoPlayer'
import InfoDialog from './components/InfoDialog'

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'

function App() {
  const bodyStyle = {
    margin: 0,
    padding: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  }

  const [infoDialogOpen, setInfoDialogOpen] = React.useState(false)

  const openInfoDialog = React.useCallback(() => {
    setInfoDialogOpen(true)
  }, [setInfoDialogOpen])

  const onInfoDialogClose = React.useCallback(() => {
    setInfoDialogOpen(false)
  }, [setInfoDialogOpen])

  return (<>
    <div style={bodyStyle}>
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1 }}>
            Live Facial Recognition
          </Typography>
          <IconButton style={{color: 'white'}} size="large">
            <HelpIcon fontSize="large" onClick={openInfoDialog}/>
          </IconButton>
        </Toolbar>
      </AppBar>

      <div>
        <FaceRecVideoPlayer/>
      </div>
    </div>
    <InfoDialog
      open={infoDialogOpen}
      onClose={onInfoDialogClose}
      maxWidth="sm"
    />
  </>);
}

export default App;
