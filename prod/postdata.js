var video = document.querySelector("#videoElement");
 
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
 
if (navigator.getUserMedia) {       
    navigator.getUserMedia({video: true}, handleVideo, videoError);
}
 
function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
}
 
function videoError(e) {
    // do something
}
 
function processCapture(faceType) {
    document.getElementById(faceType+'-button').disabled = true;
    var canvas = document.getElementById('captureVideoCanvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById("videoElement");
    var video_width = video.videoWidth;
    var video_height = video.videoHeight;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, canvas.width / 2 - video_width / 2, canvas.height / 2 - video_height / 2, video_width, video_height);
    var pngUrl = canvas.toDataURL("image/jpeg", 1.0);
    var dataImage = pngUrl.substring(23,pngUrl.length);
    // console.log(dataImage);
    // return { image: dataImage, id: this.elementId };
    
    sendtoserver(dataImage,faceType);
    submit_time++;
    
    if(submit_time == 7){
        alert('Thank you!');
        people_id = Math.random().toString().substring(11);
        document.getElementById('angry-button').disabled = false;
        document.getElementById('neutral-button').disabled = false;
        document.getElementById('surprise-button').disabled = false;
        document.getElementById('disgust-button').disabled = false;
        document.getElementById('happy-button').disabled = false;
        document.getElementById('fear-button').disabled = false;
        document.getElementById('sad-button').disabled = false;
    }
}

function sendtoserver(data,faceType){
    console.log(faceType);  
    var dataServer = {'people_id':people_id,
        'emotion' : faceType,
        'image' : data
    }
    
    console.log(dataServer);    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://eziit.com/api', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        value: dataServer
    }));
}

var submit_time = 0;
var people_id = Math.random().toString().substring(11);
console.log(people_id);
