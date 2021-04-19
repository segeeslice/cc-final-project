import React from 'react'

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
    localStorage[this.state.name] = this.props.photo.dataUri
    this.props.setPhotoTaken(false)
  }

  render() {
    return (
      <div>
        <label htmlFor='name'>
          Name of person in photo:
        </label>
        <input
          id='name'
          name='name' 
          type='text'
          value={this.state.name}
          onChange={this.onInputChange}
        />
        <button
          onClick={this.onUploadClick}
        >
          Upload
        </button>
      </div>
    )
  }
}

export default UploadManager