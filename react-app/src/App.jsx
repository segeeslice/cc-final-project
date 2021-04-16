import React from 'react'
import './App.css';
import FaceRecVideo from './components/FaceRecVideo'

//  Temporarily utilize hard-coded test images
const referenceImagePaths = [
  './images/Seg.png',
  './images/Dustin.jpg',
  './images/Mo.png'
]

function App() {
  const bodyStyle = {
    margin: 0,
    padding: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (<>
    <div style={bodyStyle}>
      <FaceRecVideo
        referenceImagePaths={referenceImagePaths}
        height="560px"
        width="720px"
      />
    </div>
  </>);
}

export default App;
