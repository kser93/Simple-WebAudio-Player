define(
    [
        'backbone',
        'id3',
        'components/EventDispatcher'
    ],
    function(
        Backbone,
        ID3,
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

        var recognizeMeta = function(file) {
            var src = URL.createObjectURL(file);
            ID3.loadTags(src, function() {

                var arrayToImage = function(array) {
                    var base64String = "";
                    if (!array) {
                        return null;
                    }
                    for (var i = 0; i < array.data.length; i++) {
                        base64String += String.fromCharCode(array.data[i]);
                    }
                    var dataUrl = "data:" + array.format + ";base64," + window.btoa(base64String);
                    var img = new Image;
                    img.src = dataUrl;
                    return img;
                };

                var meta = ID3.getAllTags(src);
                meta.cover = arrayToImage(meta.picture);
                EventDispatcher.trigger(
                    'metaRecognized',
                    {
                        artist: meta.artist,
                        album: meta.album,
                        title: meta.title,
                        cover: meta.cover
                    });

            }, {
                dataReader: FileAPIReader(file),
                tags: ['title', 'artist', 'album', 'picture']
            });

            return src;
        };

        var play = function() {
            audio.play();
        };

        var pause = function() {
            audio.pause();
        };

        var setVolume = function(volume) {
            nodes.volume.gain.value = volume / 100;
        };

        AudioControl.listenTo(EventDispatcher, 'compositionLoaded', function(file) {
            nodes.connectGraph();
            audio.src = recognizeMeta(file);
        });

        $(audio)
            .on('canplay', function() {
                EventDispatcher.trigger(
                    'compositionReady',
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
            })
            .on('ended', function() {
                EventDispatcher.trigger('compositionFinished');
            });

        AudioControl.listenTo(EventDispatcher, 'play', play);
        AudioControl.listenTo(EventDispatcher, 'pause', pause);
        AudioControl.listenTo(EventDispatcher, 'setVolume', setVolume);
        return AudioControl;
});