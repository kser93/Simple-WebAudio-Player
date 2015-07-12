define(['backbone'], function(Backbone) {
    var UIDispatcher = {};
    _.extend(UIDispatcher, Backbone.Events);
    UIDispatcher.controls = {
        playPauseButton: $('[class*=playpause]')
    };

    UIDispatcher.controls.playPauseButton.click(function() {
        var button = $(this);
        if (button.hasClass('controls__playpause_play')) {
            button.removeClass('controls__playpause_play');
            button.addClass('controls__playpause_pause');
        }
        else if (button.hasClass('controls__playpause_pause')) {
            button.removeClass('controls__playpause_pause');
            button.addClass('controls__playpause_play');
        }
    });

    return UIDispatcher;
});