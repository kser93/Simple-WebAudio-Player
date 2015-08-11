requirejs({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.1.4.min',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
        id3: 'lib/id3-minimized'

    },
    shim: {
        //'backbone': {
        //    deps: ['jquery', 'underscore'],
        //    exports: 'Backbone'
        //},
        //'underscore': {
        //    exports: '_'
        //},
        id3: {
            exports: 'ID3'
        }

    }
});

define(
    [
        'components/AudioControl',
        'components/EventDispatcher',

        'components/ui/Volume/model',
        'components/ui/Volume/view',

        'components/ui/PlayPauseButton/model',
        'components/ui/PlayPauseButton/view',

        'components/ui/Progress/model',
        'components/ui/Progress/view',

        'components/ui/Screen/model',
        'components/ui/Screen/view'
    ],
    function(
        AudioControl,
        EventDispatcher,

        VolumeModel,
        VolumeView,

        PlayPauseButtonModel,
        PlayPauseButtonView,

        ProgressModel,
        ProgressView,

        ScreenModel,
        ScreenView
    ) {
        var playPauseButton = new PlayPauseButtonView({model: new PlayPauseButtonModel()});
        var progress = new ProgressView({model: new ProgressModel()});
        var screen = new ScreenView({model: new ScreenModel()});
        var volumeControl = new VolumeView({model: new VolumeModel()});

        $('*').on('dragover dragenter dragleave drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
    });