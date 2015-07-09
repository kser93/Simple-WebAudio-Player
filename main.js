var audioCtx, buf;

var initializeAudioContext = function() {
    audioCtx = new window.AudioContext();
};

function playExample() {
    var src = audioCtx.createBufferSource();
    var gainNode = audioCtx.createGain();

    src.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    src.buffer = buf;
    src.start();
}

var dropTarget = document.getElementById('drop-target');

window.addEventListener('load', initializeAudioContext, false);

dropTarget.addEventListener('dragenter', function(e) {
    e.stopPropagation();
    e.preventDefault();

    dropTarget.classList.add('hover');
}, false);

dropTarget.addEventListener('dragleave', function(e) {
    e.stopPropagation();
    e.preventDefault();

    dropTarget.classList.remove('hover');
}, false);

dropTarget.addEventListener('drop', function(e) {
    e.stopPropagation();
    e.preventDefault();

    var dataTransger = e.dataTransfer,
        files = dataTransger.files;

    audioCtx.decodeAudioData(files, function(buffer) {
        buf = buffer;
        playExample();
    });
}, false);
