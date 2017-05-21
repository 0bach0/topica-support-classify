var video = document.querySelector("#videoElement");
var HOTKEYS = { 48: 0, 49: 1, 50: 2, 51: 3, 52: 4, 53: 5, 54: 6, 55: 7, 56: 8, 57: 9,
                96: 0, 97: 1, 98: 2, 99: 3, 100: 4, 101: 5, 102: 6, 103: 7, 104: 8, 105: 9,
                32:-1,37:-2,39:-3}
                
var VIDEO_TYPE = {1:'neutral',2:'surprise',3:'disgust',4:'happy',5:'angry',6:'fear',7:'sad'}
var video_play = false;
var video_count =1;
    

function nextVideoFunction (){
      video_count++;
      if (video_count == 8  ) video_count = 1;
      var nextVideo = "/video/video-"+video_count+".mp4";
      video.src = nextVideo;
      video.play();
}

function prevVideoFunction (){
      video_count--;
      if (video_count == 0  ) video_count = 8;
      var nextVideo = "/video/video-"+video_count+".mp4";
      video.src = nextVideo;
      video.play();
}



document.onkeydown = function(evt) {
    evt = evt || window.event;
    
    var key_press = HOTKEYS[evt.keyCode];
    if(HOTKEYS[evt.keyCode] > 0 && HOTKEYS[evt.keyCode] < 8){
        processCapture(VIDEO_TYPE[HOTKEYS[evt.keyCode]]);
    }
    
    if(key_press < 0){
        if(key_press == -1){

            if(video.paused){
                document.getElementById('videoElement').play();
            }
            else{
                document.getElementById('videoElement').pause();
            }
        }
        if(key_press==-2){
        
            video.currentTime = video.currentTime - 1;
        }
        if(key_press==-3){
            
            video.currentTime = video.currentTime + 1;
        }
    }
    
    
};

 
// navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
 
// if (navigator.getUserMedia) {       
//     navigator.getUserMedia({video: true}, handleVideo, videoError);
// }
 
// function handleVideo(stream) {
//     video.src = window.URL.createObjectURL(stream);
// }
 
function videoError(e) {
    // do something
}
 
function processCapture(faceType) {
    
    var buttonName = faceType+'-button';
    
    document.getElementById('snapshot').innerHTML = faceType;
    var temp = function changeNormal(buttonName){
        console.log(buttonName,'change to normal');
        document.getElementById(buttonName).className = 'btn btn-primary';
    }
    setTimeout(temp(buttonName),5000)
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
    // submit_time++;
    
    // if(submit_time == 7){
    //     alert('Thank you!');
    //     people_id = Math.random().toString().substring(11);
    //     document.getElementById('angry-button').disabled = false;
    //     document.getElementById('neutral-button').disabled = false;
    //     document.getElementById('surprise-button').disabled = false;
    //     document.getElementById('disgust-button').disabled = false;
    //     document.getElementById('happy-button').disabled = false;
    //     document.getElementById('fear-button').disabled = false;
    //     document.getElementById('sad-button').disabled = false;
    // }
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

// var submit_time = 0;
var people_id = Math.random().toString().substring(11);
console.log(people_id);
