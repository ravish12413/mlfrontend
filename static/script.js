const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captionText = document.getElementById('caption');
const ctx = canvas.getContext('2d');

// Access webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    });

// Capture frame every 3 seconds
setInterval(() => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');

    fetch('https://efce-35-185-28-128.ngrok-free.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData })
    })
    .then(res => res.json())
    .then(data => {
        captionText.innerText = data.caption;

        // Speak the caption
        const utterance = new SpeechSynthesisUtterance(data.caption);
        speechSynthesis.speak(utterance);
    });
}, 3000);
