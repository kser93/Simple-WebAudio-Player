define(
    [
        'backbone',
        'components/EventAggregator'
    ],
    function(
        Backbone,
        EventAggregator
    ) {
    var UIController = _.extend({
        controls: {
            playPauseButton: $('[class^=controls][class*=playpause]'),
            equalizerButton: $('[class^=controls][class*=equalizer]')
        },

        enableUI: function() {
            UIController.controls.playPauseButton.removeClass('controls__playpause_inactive');
            UIController.controls.playPauseButton.addClass('controls__playpause_pause');

            UIController.controls.equalizerButton.removeClass('controls__equalizer_inactive');
            UIController.controls.equalizerButton.addClass('controls__equalizer');
        },

        clickPlayPauseButton: function() {
            var button = UIController.controls.playPauseButton;
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
        }
    }, Backbone.Events);

    UIController.listenTo(EventAggregator, 'ready', UIController.enableUI);
    UIController.controls.playPauseButton.click(UIController.clickPlayPauseButton);

    return UIController;
});