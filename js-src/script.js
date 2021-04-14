const video = document.getElementById('video')

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

// Start the video upon loading this file
startVideo()
