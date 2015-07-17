define(
    [
        'backbone',
        'components/EventDispatcher'
    ],
    function(
        Backbone,
        EventDispatcher
    ) {
        var audio = $('audio')[0];

        var AudioControl = _.extend({}, Backbone.Events);

        var ctx = new AudioContext(),
            nodes = {
                source: ctx.createMediaElementSource(audio),
                analyser: ctx.createAnalyser(),
                volume: ctx.createGain(),
                destination: ctx.destination,
                connectGraph: function() {
                    nodes.source.connect(nodes.analyser);
                    nodes.analyser.connect(nodes.volume);
                    nodes.volume.connect(nodes.destination);
                }
            };

        var play = function() {
            audio.play();
        };

        var pause = function() {
            audio.pause();
        };

        AudioControl.listenTo(EventDispatcher, 'playFile', function(src) {
            nodes.connectGraph();
            audio.src = src;

            audio.play();
        });

        $(audio)
            .on('canplay', function() {
                EventDispatcher.trigger(
                    'ready',
                    {
                        duration: audio.duration
                    }
                );
            })
            .on('timeupdate', function() {
                EventDispatcher.trigger(
                    'changeProgress',
                    {
                        progress: 100 * audio.currentTime / audio.duration,
                        currentTime: Math.round(audio.currentTime)
                    }
                );
            });

        AudioControl.listenTo(EventDispatcher, 'play', play);
        AudioControl.listenTo(EventDispatcher, 'pause', pause);
        AudioControl.listenTo(EventDispatcher, 'changeVolume', function(volume) {
            nodes.volume.gain.value = volume / 100;
        });
        return AudioControl;
});