define(
    [
        'backbone',
        'components/EventDispatcher'
    ],
    function(
        Backbone,
        EventDispatcher
    ) {
        var $el = $('[class*=controls][class*=playpause]');

        var PlayPauseButton = _.extend({}, Backbone.Events);

        var enable = function() {
            $el.addClass('player__controls__playpause_pause');
            $el.removeClass('player__controls__playpause_inactive');
        };

        PlayPauseButton.listenTo(EventDispatcher, 'ready', enable);
        $el.click(function() {
            if ($el.is('[class$=play]')) {
                $el.removeClass('player__controls__playpause_play');
                $el.addClass('player__controls__playpause_pause');
                EventDispatcher.trigger('play');
            }
            else if ($el.is('[class$=pause]')) {
                $el.removeClass('player__controls__playpause_pause');
                $el.addClass('player__controls__playpause_play');
                EventDispatcher.trigger('pause');
            }
        });

        return PlayPauseButton;
    }
);