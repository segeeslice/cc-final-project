// == METHODS ==

// import * as canvas from 'canvas';
import * as faceapi from 'face-api.js'

import { setAsyncInterval, clearAsyncInterval } from './async-interval.js'

// const { Canvas, Image, ImageData } = canvas
// faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

// Start the video from a user camera
// Browsers should prompt for device independently
export async function startVideo(videoEl) {
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
export function stopVideo (videoEl) {
    let stream = videoEl.srcObject
    if (stream == null) return

    let tracks = stream.getTracks()
    for (var i = 0; i < tracks.length; i++) {
        let track = tracks[i]
        track.stop()
    }

    videoEl.srcObject = null
}

// Clear a canvas UI element
export function clearCanvas (canvas) {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
}

// Load all the necessary models for faceapi
// Each should correspond to a file under models/
// Returns a promise
export function loadFaceApiModels () {
    return Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
        // faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
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
export async function startFacialDetection(videoEl, opts) {
    const displaySize = { width: videoEl.width, height: videoEl.height }
    let { referenceImagePaths, canvas } = opts

    if (canvas == null) {
        canvas = getOverlappingCanvas(videoEl)
        canvas.style["position"] = "absolute"
    }

    console.log('Loading reference images...')
    const labeledFaceDescriptors = await loadReferenceImages(referenceImagePaths)
    console.log('Making face matcher system...')
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
    console.log('Complete. Launching live facial detection...')

    // Can later be cancelled via clearAsyncInterval
    let faceInterval = setAsyncInterval(async () => {
        // Detect via a smaller, faster (less accurate) model
        const detector = new faceapi.TinyFaceDetectorOptions()

        // Get all faces in the frame
        // Descriptors are required for facial recognition, and
        // landmarks are required for descriptors
        const detections = await faceapi.detectAllFaces(videoEl, detector)
                                        .withFaceLandmarks()
                                        .withFaceDescriptors()

        // Resize the facial detections to fit the current display
        const resizedDetections = faceapi.resizeResults(detections, displaySize)

        // Do facial matching against given face matching system
        const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))

        // Draw each found face with our guess as to who it is
        clearCanvas(canvas)
        results.forEach((result, i) => {
            // Contains "{label} ({confidence score})"
            const rawLabel = result.toString()

            // Remove confidence score from label
            const label = rawLabel.match(/[^()]+/)[0].trim()

            // Draw resulting system
            const box = resizedDetections[i].detection.box
            const drawBox = new faceapi.draw.DrawBox(box, { label })
            drawBox.draw(canvas)
        })
    }, 50)

    // Return details in an object for later clearing
    return { faceInterval, canvas }
}

// Stop facial detection and clear canvas
export function stopFacialDetection ({ canvas, faceInterval}) {
    clearAsyncInterval(faceInterval)
    clearCanvas(canvas)
}

function getFileName (fullPath) {
    return fullPath.match(/[^/]*$/)[0]
}

function getFileExt (fileName) {
    return fileName.match(/\..*$/)[0]
}

function removeFileExt (fileName) {
    const ext = getFileExt(fileName)
    return fileName.slice(0, fileName.length - ext.length)
}

// Load all reference images for facial recognition
// Label for each image are simply taken from image name
// paths is a list of all image paths to load
// NOTE: Could make this instead to load multiple references per image
//       However this would probably require this to be ran as a Node app
async function loadReferenceImages (paths) {
    const descriptors = []

    // For reference images already in public folder
    for (const i in paths) {
        const path = paths[i]
        try {
            // Fetch the image and detect the most prominant face
            const img = await faceapi.fetchImage(path)
            const detections = await faceapi.detectSingleFace(img)
                                            .withFaceLandmarks()
                                            .withFaceDescriptor()

            // Label the descriptor and keep track of it
            const label = removeFileExt(getFileName(path))
            const labeledDescriptor = new faceapi.LabeledFaceDescriptors(label, [detections.descriptor])
            descriptors.push(labeledDescriptor)

        } catch (e) {
            console.log(`Could not load image at ${path}: ${e}`)
        }
    }

    // For images uploaded to localStorage

    for (var k = 0; k < localStorage.length; k++) {
        const label = localStorage.key(k)
        
        try {
            const img = await faceapi.fetchImage(localStorage[label])
            const detections = await faceapi.detectSingleFace(img)
                                            .withFaceLandmarks()
                                            .withFaceDescriptor()
        
            const labeledDescriptor = new faceapi.LabeledFaceDescriptors(label, [detections.descriptor])
            descriptors.push(labeledDescriptor)

        } catch (e) {
            console.log(`Could not load image for ${label}: ${e}`)
        }
    }

    return descriptors
}

// == MAIN CODE ==

// // Retrieve the video element from the calling HTML file
// const videoEl = document.getElementById('video')

// // Temporarily utilize hard-coded test images
// const referenceImagePaths = [
//     './images/Seg.png',
//     './images/Dustin.jpg',
//     './images/Mo.png'
// ]

// // Load models and start facial detection
// loadFaceApiModels()
//     .then(() => {
//         startVideo(videoEl)
//         // To stop:
//         // stopVideo(videoEl)

//         video.addEventListener('play', async () => {
//             let detectObj = await startFacialDetection(videoEl, referenceImagePaths)

//             // To stop:
//             // stopFacialDetection(detectObj)
//         })
//     })
