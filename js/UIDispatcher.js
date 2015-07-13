define(['backbone'], function(Backbone) {
    var UIDispatcher = {};
    _.extend(UIDispatcher, Backbone.Events);
    UIDispatcher.controls = {
        playPauseButton: $('[class^=controls][class*=playpause]'),
        equalizerButton: $('[class^=controls][class*=equalizer]')
    };

    UIDispatcher.controls.playPauseButton.click(function() {
        var button = $(this);
        if (button.is('[class$=play]')) {
            button.removeClass('controls__playpause_play');
            button.addClass('controls__playpause_pause');
            UIDispatcher.trigger('play');
        }
        else if (button.is('[class$=pause]')) {
            button.removeClass('controls__playpause_pause');
            button.addClass('controls__playpause_play');
            UIDispatcher.trigger('pause');
        }
    });

    return UIDispatcher;
});