define(
    [
        'backbone',
        'components/EventAggregator'
    ],
    function(
        Backbone,
        EventAggregator
    ) {
    var AudioController = _.extend({}, Backbone.Events);

    AudioController.context = new AudioContext();
    AudioController.nodes = {
        source: AudioController.context.createBufferSource(),
        volume: AudioController.context.createGain(),
        destination: AudioController.context.destination,

        connectGraph: function() {
            AudioController.nodes.source.connect(
                AudioController.nodes.volume
            );
            AudioController.nodes.volume.connect(
                AudioController.nodes.destination
            );
        },

        updateSourceNode: function() {
            var newSource = AudioController.context.createBufferSource();
            newSource.buffer = AudioController.nodes.source.buffer;

            AudioController.nodes.source = newSource;
            AudioController.nodes.connectGraph();
        }
    };
    AudioController.startTime = 0;
    AudioController.startOffset = 0;

    AudioController.play = function() {
        AudioController.startTime = AudioController.context.currentTime;
        AudioController.nodes.updateSourceNode();
        AudioController.nodes.source.start(0, AudioController.startOffset % AudioController.nodes.source.buffer.duration);
        //console.log(AudioController.startTime);
        //console.log(AudioController.startOffset);
    };

    AudioController.pause = function() {
        AudioController.nodes.source.stop(0);
        AudioController.startOffset += (AudioController.context.currentTime - AudioController.startTime);
        //console.log(AudioController.startTime);
        //console.log(AudioController.startOffset);
    };

    AudioController.listenTo(EventAggregator, 'play', AudioController.play);
    AudioController.listenTo(EventAggregator, 'pause', AudioController.pause);

    AudioController.test = function() {
        var req = new XMLHttpRequest();
        req.open("GET","italiano.mp3",true);
        req.responseType = "arraybuffer";
        req.onload = function() {
            AudioController.context.decodeAudioData(req.response, function(buffer) {
                //src.connect(AudioController.nodes.destination);
                AudioController.nodes.source.buffer = buffer;
                console.log(buffer);
                AudioController.play();
            });
        };
        req.send();
    };

    return AudioController;
});