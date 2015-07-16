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

        var ctx = new AudioContext(),
            buffer = null,
            nodes = {
                source: ctx.createBufferSource(),
                volume: ctx.createGain(),
                destination: ctx.destination,
                connectGraph: function() {
                    nodes.source.connect(nodes.volume);
                    nodes.volume.connect(nodes.destination);
                },
                updateSourceNode: function() {
                    var newSource = ctx.createBufferSource();
                    newSource.buffer = buffer;

                    nodes.source = newSource;
                    nodes.connectGraph();
                }
            },
            startTime = 0,
            startOffset = 0;

        AudioController.play = function() {
            console.log(nodes.source.buffer);
            startTime = ctx.currentTime;
            nodes.updateSourceNode();
            nodes.source.start(0, startOffset % nodes.source.buffer.duration);
        };

        AudioController.pause = function() {
            console.log(nodes.source.buffer);
            nodes.source.stop(0);
            startOffset += (ctx.currentTime - startTime);
        };

        AudioController.listenTo(EventAggregator, 'play', AudioController.play);
        AudioController.listenTo(EventAggregator, 'pause', AudioController.pause);

        AudioController.test = function() {
            var req = new XMLHttpRequest();
            req.open("GET","italiano.mp3",true);
            req.responseType = "arraybuffer";
            req.onload = function() {
                ctx.decodeAudioData(req.response, function(_buffer) {
                    buffer = _buffer;
                    AudioController.play();

                    EventAggregator.trigger('ready');
                    updateProgress();

                });
            };
            req.send();
        };

        var updateProgress = function() {
            /*
            * вызывается, когда трек запущен
            * обновляет текущее время трека
            * производит событие timeUpdated
            * повторяется при помощи requestAnimationFrame
            * останавливается, когда трек на паузе(???)
            *
            */
            var step = function(timestamp) {
                //startOffset += (ctx.currentTime - startTime);
                //var progress = startOffset / nodes.source.duration;
                console.log(timestamp);

                requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };

        return AudioController;
});