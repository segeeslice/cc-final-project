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
    this.props.onUpload()
  }

  onCancelClick = () => {
    this.props.onUpload()
  }

  render() {
    return (
      <div style={{display: 'flex', padding: '12px 12px', alignItems: 'center'}}>
        <TextField
          id='name'
          name='name'
          variant='outlined'
          label='Name'
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
