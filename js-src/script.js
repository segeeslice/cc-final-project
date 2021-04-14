// == METHODS ==

// Start the video from a user camera
// Browsers should prompt for device independently
async function startVideo(videoEl) {
    let stream = null;

    try {
        stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
        })
    } catch (err) {
        console.error(err)
    }

    videoEl.srcObject = stream
}

// Stop the user camera video
function stopVideo (videoEl) {
    let stream = videoEl.srcObject
    if (stream === null) return

    let tracks = stream.getTracks()
    for (var i = 0; i < tracks.length; i++) {
        let track = tracks[i]
        track.stop()
    }

    videoEl.srcObject = null
}

// Clear a canvas UI element
function clearCanvas (canvas) {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
}

// Load all the necessary models for faceapi
// Each should correspond to a file under models/
// Returns a promise
function loadFaceApiModels () {
    return Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    ])
}

// Get a canvas to perfectly overlap the given video element
function getOverlappingCanvas(videoEl) {
    // Create the canvas
    const canvas = faceapi.createCanvasFromMedia(videoEl)
    document.body.append(canvas)

    // Match canvas dimensions with the given video element
    const displaySize = { width: videoEl.width, height: videoEl.height }
    faceapi.matchDimensions(canvas, displaySize)

    return canvas
}

// Start facial detection on a video element with the given overlapping canvas
function startFacialDetection(videoEl) {
    const displaySize = { width: videoEl.width, height: videoEl.height }
    const canvas = getOverlappingCanvas(videoEl)

    // Can later be cancelled via clearAsyncInterval
    let faceInterval = setAsyncInterval(async () => {
        // Detect via a smaller, faster (less accurate) model
        const detector = new faceapi.TinyFaceDetectorOptions()

        // Get all faces in the frame with any additional settings
        const detections = await faceapi.detectAllFaces(videoEl, detector)

        // Clear the canvas on each iteration
        clearCanvas(canvas)

        // Resize the facial detections to fit the current display
        const resizedDetections = faceapi.resizeResults(detections, displaySize)

        // Finally, draw the resultant detections
        faceapi.draw.drawDetections(canvas, resizedDetections)
    }, 50)

    // Return details in an object for later clearing
    return { faceInterval, canvas }
}

// Stop facial detection and clear canvas
function stopFacialDetection ({ canvas, faceInterval}) {
    clearAsyncInterval(faceInterval)
    clearCanvas(canvas)
}

// == MAIN CODE ==

// Retrieve the video element from the calling HTML file
const videoEl = document.getElementById('video')

// Load models and start facial detection
loadFaceApiModels()
    .then(() => {
        startVideo(videoEl)
        // To stop:
        // stopVideo(videoEl)

        video.addEventListener('play', () => {
            let detectObj = startFacialDetection(videoEl)
            // To stop:
            // stopFacialDetection(detectObj)
        })
    })
