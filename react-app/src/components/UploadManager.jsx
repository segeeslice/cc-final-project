import React from 'react'

import { 
  TextField,
  IconButton,
  Typography
} from '@material-ui/core'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ClearIcon from '@material-ui/icons/Clear'

class UploadManager extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }

    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onUploadClick = () => {
    sessionStorage[this.state.name] = this.props.photo.dataUri
    this.props.setPhotoTaken(false)
  }

  onCancelClick = () => {
    this.props.setPhotoTaken(false)
  }

  render() {
    return (
      <div style={{display: 'flex', padding: '12px 12px', alignItems: 'center'}}>
        <span>
          <label htmlFor='name'>
            <Typography variant="h6" style={{padding: '0px 12px'}}>
              Name:
            </Typography>
          </label>
        </span>
        <TextField
          id='name'
          name='name'
          variant='outlined'
          value={this.state.name}
          onChange={this.onInputChange}
        />
        <IconButton
          onClick={this.onUploadClick}
        >
          <ArrowUpwardIcon/>
        </IconButton>
        <IconButton
          onClick={this.onCancelClick}
        >
          <ClearIcon/>
        </IconButton>
        
      </div>
    )
  }
}

export default UploadManager