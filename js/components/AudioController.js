define(
    [
        'backbone',
        'components/EventDispatcher'
    ],
    function(
        Backbone,
        EventDispatcher
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

        var play = function() {
            console.log(nodes.source.buffer);
            startTime = ctx.currentTime;
            nodes.updateSourceNode();
            nodes.source.start(0, startOffset % nodes.source.buffer.duration);
        };

        var pause = function() {
            console.log(nodes.source.buffer);
            nodes.source.stop(0);
            startOffset += (ctx.currentTime - startTime);
        };

        AudioController.listenTo(EventDispatcher, 'play', play);
        AudioController.listenTo(EventDispatcher, 'pause', pause);

        AudioController.test = function() {
            var req = new XMLHttpRequest();
            req.open("GET","static/italiano.mp3",true);
            req.responseType = "arraybuffer";
            req.onload = function() {
                ctx.decodeAudioData(req.response, function(_buffer) {
                    buffer = _buffer;
                    play();
                    EventDispatcher.trigger('ready');
                });
            };
            req.send();
        };
        //
        //var updateProgress = function() {
        //    /*
        //    * вызывается, когда трек запущен
        //    * обновляет текущее время трека
        //    * производит событие timeUpdated
        //    * повторяется при помощи requestAnimationFrame
        //    * останавливается, когда трек на паузе(???)
        //    *
        //    */
        //    var step = function(timestamp) {
        //        //startOffset += (ctx.currentTime - startTime);
        //        //var progress = startOffset / nodes.source.duration;
        //        console.log(timestamp);
        //
        //        requestAnimationFrame(step);
        //    };
        //    requestAnimationFrame(step);
        //};


        AudioController.listenTo(EventDispatcher, 'changeVolume', function(volume) {
            nodes.volume.gain.value = volume / 100;
        });
        return AudioController;
});