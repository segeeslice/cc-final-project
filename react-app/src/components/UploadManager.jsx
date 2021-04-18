import React from 'react';
import axios from 'axios';

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
    // const data = new FormData()
    // data.append(this.state.name, this.props.photo.blob, this.state.name + '.png')
    // axios.post('/upload', data).then((res) => {
    //   console.log(res)
    // });
  };

  render() {
    return (
      <div>
        <label for='name'>
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