requirejs({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.1.4.min',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
        id3: 'lib/id3-minimized'

    },
    shim: {
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        id3: {
            exports: 'ID3'
        }

    }
});

define(
    [
        'components/AudioControl',
        'components/EventDispatcher',
        'components/ui/VolumeControl',
        'components/ui/ProgressControl',
        'components/ui/PlayPauseButton',
        'components/ui/ScreenControl'
    ],
    function(
        AudioControl,
        EventDispatcher,
        VolumeControl,
        ProgressControl,
        PlayPauseButton,
        ScreenControl
    ) {
});