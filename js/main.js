requirejs({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.1.4.min',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',

        text: 'lib/text'
    },
    shim: {
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

define(
    [
        'components/UIController',
        'components/AudioController',
        'components/EventAggregator'
    ],
    function(
        UIController,
        AudioController,
        EventAggregator
    ) {
    console.log(UIController);
    console.log(AudioController);
    AudioController.test();
});

//var audioCtx, buf;
//
//var initializeAudioContext = function() {
//    audioCtx = new window.AudioContext();
//};
//
//function playExample() {
//    var src = audioCtx.createBufferSource();
//    var gainNode = audioCtx.createGain();
//
//    src.connect(gainNode);
//    gainNode.connect(audioCtx.destination);
//    src.buffer = buf;
//    src.start();
//}
//
//var dropTarget = document.getElementById('drop-target');
//
//window.addEventListener('load', initializeAudioContext, false);
//
//dropTarget.addEventListener('dragenter', function(e) {
//    e.stopPropagation();
//    e.preventDefault();
//
//    dropTarget.classList.add('hover');
//}, false);
//
//dropTarget.addEventListener('dragleave', function(e) {
//    e.stopPropagation();
//    e.preventDefault();
//
//    dropTarget.classList.remove('hover');
//}, false);
//
//dropTarget.addEventListener('drop', function(e) {
//    e.stopPropagation();
//    e.preventDefault();
//
//    var dataTransfer = e.dataTransfer,
//        files = dataTransfer.files;
//
//    //console.log(dataTransfer);
//
//    audioCtx.decodeAudioData(files, function(buffer) {
//        buf = buffer;
//        playExample();
//    });
//}, false);


//----------


//function loadFile() {
//
//}
//
//function prepareAudioContext() {
//
//}
//
//function playFile() {
//
//}
//
//function createUIDispatcher() {
//    var UIDispatcher = new Object();
//
//    UIDispatcher.controls = new Object();
//    UIDispatcher.controls = new Object();
//    $('.controls__play, .controls__pause').click(function() {
//        console.log(this.classList);
//        this.classList.toggle('controls__play');
//        this.classList.toggle('controls__pause');
//    });
//
//    return UIDispatcher;
//}
//
//$(function() {
//    //
//    //prepareAudioContext();
//    //
//    var UIDispatcher = createUIDispatcher();
//    //
//    //var ctx = new window.AudioContext();
//    //console.log(ctx);
//    //
//    //$('html').on('dragover dragenter drop', function(e) {
//    //    e.stopPropagation();
//    //    e.preventDefault();
//    //});
//    //
//    //var dropTarget = $('#drop-target');
//    //dropTarget.on('dragenter', function(e) {
//    //    e.stopPropagation();
//    //    e.preventDefault();
//    //
//    //    dropTarget.addClass('hover');
//    //});
//    //dropTarget.on('dragleave', function(e) {
//    //    e.stopPropagation();
//    //    e.preventDefault();
//    //
//    //    dropTarget.removeClass('hover');
//    //});
//    //
//    //dropTarget.on('drop', function(e) {
//    //    e.stopPropagation();
//    //    e.preventDefault();
//    //
//    //    loadFile();
//    //    prepareAudioContext();
//    //    playFile();
//    //    var dataTransfer = e.dataTransfer,
//    //        files = dataTransfer.files;
//    //});
//
//
//
//});
