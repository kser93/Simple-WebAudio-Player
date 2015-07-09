var audioCtx, buf;

var initializeAudioContext = function() {
    audioCtx = new window.AudioContext();
    loadExample();
};

function loadExample() {
    var req = new XMLHttpRequest();
    req.open("GET","italiano.mp3",true);
    req.responseType = "arraybuffer";
    req.onload = function() {
        audioCtx.decodeAudioData(req.response, function(buffer) {
            buf = buffer;
            playExample();
        });
    };
    req.send();
}

function playExample() {
    var src = audioCtx.createBufferSource();
    var gainNode = audioCtx.createGain();

    src.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    src.buffer = buf;
    src.start();
}

window.addEventListener('load', initializeAudioContext, false);