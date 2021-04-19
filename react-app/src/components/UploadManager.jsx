import React from 'react'
import axios from 'axios'

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

  // onUploadClick = () => {
  //   const data = new FormData()
  //   data.append('image', this.props.photo.blob, this.state.name + '.png')
  //   axios.post('http://localhost:3000/upload', data).then((res) => { //This URL should be changed to the actual server URL when deployed
  //     console.log(res)
  //   }).catch(error => console.log(error))
  // }

  onUploadClick = () => {
    localStorage[this.state.name] = this.props.photo.dataUri
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