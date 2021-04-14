// == CONSTANTS ==

// Retrieve the video element from the calling HTML file
const video = document.getElementById('video')

let faceInterval = null

// == METHODS ==

// Start the video from a user camera
// Browsers should prompt for device independently
async function startVideo() {
    let stream = null;

    try {
        stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
        })
    } catch (err) {
        console.error(err)
    }

    video.srcObject = stream
}

// Stop the user camera video
function stopVideo () {
    let stream = video.srcObject
    if (stream === null) return

    let tracks = stream.getTracks()
    for (var i = 0; i < tracks.length; i++) {
        let track = tracks[i]
        track.stop()
    }

    video.srcObject = null
}

// Clear a canvas UI element
function clearCanvas (canvas) {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
}

// == MAIN CODE ==

// Import facial recognition models and start the video once we're ready
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
]).then(startVideo)

// Once the models are loaded and the video is playing, begin the additional
// facial recognition
video.addEventListener('play', () => {
    // Create and add an HTML element to the page for displaying the facial
    // recognition details
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)

    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)

    // Set the global facial detection interval
    // Can later be cancelled via clearAsyncInterval
    faceInterval = setAsyncInterval(async () => {
        // Detect via a smaller, faster (less accurate) model
        const detector = new faceapi.TinyFaceDetectorOptions()

        // Get all faces in the frame with any additional settings
        const detections = await faceapi.detectAllFaces(video, detector)
                                        .withFaceLandmarks()
                                        .withFaceExpressions()

        // Clear the canvas on each iteration
        clearCanvas(canvas)

        // Resize the facial detections to fit the current display
        const resizedDetections = faceapi.resizeResults(detections, displaySize)

        // Finally, draw the resultant detections
        faceapi.draw.drawDetections(canvas, resizedDetections)
    }, 50)
})
