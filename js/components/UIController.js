define(
    [
        'backbone',
        'components/EventAggregator'
    ],
    function(
        Backbone,
        EventAggregator
    ) {
    var UIController = _.extend({}, Backbone.Events);
    UIController.controls = {
        playPauseButton: $('[class^=controls][class*=playpause]'),
        equalizerButton: $('[class^=controls][class*=equalizer]')
    };

    UIController.listenTo(EventAggregator, 'ready', function() {
        UIController.controls.playPauseButton.removeClass('controls__playpause_inactive');
        UIController.controls.playPauseButton.addClass('controls__playpause_pause');
    });
    UIController.controls.playPauseButton.click(function() {
        var button = $(this);
        if (button.is('[class$=play]')) {
            button.removeClass('controls__playpause_play');
            button.addClass('controls__playpause_pause');
            EventAggregator.trigger('play');
        }
        else if (button.is('[class$=pause]')) {
            button.removeClass('controls__playpause_pause');
            button.addClass('controls__playpause_play');
            EventAggregator.trigger('pause');
        }
    });

    return UIController;
});