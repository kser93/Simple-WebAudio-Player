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

        var PlayPauseButton = _.extend({
            displayProgress: function(progress) {
                if (progress < 0) {
                    progress = 0;
                }
                else if (progress > 100) {
                    progress = 100;
                }
                $el.css(
                    'background',
                    'linear-gradient(to right, #ED9939 ' + progress + '%, transparent ' + progress + '%), ' +
                    '#C0C0C0'
                );
            }
        }, Backbone.Events);

        var enable = function() {
            console.log($el);
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