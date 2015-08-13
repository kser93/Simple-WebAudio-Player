define(
    [
        'backbone',
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
        Backbone,
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

        var UIControl = _.extend({}, Backbone.Events);

        UIControl.listenTo(UIControl.playPauseButton, 'play', function () {
            EventDispatcher.trigger('play');
        });
        UIControl.listenTo(UIControl.playPauseButton, 'pause', function () {
            EventDispatcher.trigger('pause');
        });
    });