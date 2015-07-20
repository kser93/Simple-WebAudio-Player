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
        'components/ui/ScreenControl',
        'components/PlayPauseButton/model',
        'components/PlayPauseButton/view',
        'components/Progress/model',
        'components/Progress/view'
    ],
    function(
        AudioControl,
        EventDispatcher,
        VolumeControl,
        ScreenControl,
        PlayPauseButtonModel,
        PlayPauseButtonView,
        ProgressModel,
        ProgressView
    ) {
        var playPauseButton = new PlayPauseButtonView({model: new PlayPauseButtonModel()});
        var Progress = new ProgressView({model: new ProgressModel()});
});