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

        var AudioController = _.extend({}, Backbone.Events);

        var ctx = new AudioContext(),
            nodes = {
                source: ctx.createMediaElementSource(audio),
                volume: ctx.createGain(),
                destination: ctx.destination,
                connectGraph: function() {
                    nodes.source.connect(nodes.volume);
                    nodes.volume.connect(nodes.destination);
                }
            };

        var play = function() {
            audio.play();
        };

        var pause = function() {
            audio.pause();
        };

        AudioController.listenTo(EventDispatcher, 'play', play);
        AudioController.listenTo(EventDispatcher, 'pause', pause);

        AudioController.testMedia = function() {
            audio.src = "static/ghostdivision.mp3";
            audio.load();
            nodes.connectGraph();
            play();
        };

        $(audio)
            .on('loadeddata', function() {
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
                console.log('now: ' + audio.currentTime + '; full: ' + audio.duration + '; progress: ' + Math.round());
            });

        AudioController.listenTo(EventDispatcher, 'changeVolume', function(volume) {
            nodes.volume.gain.value = volume / 100;
        });
        return AudioController;
});