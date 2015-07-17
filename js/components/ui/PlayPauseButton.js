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
            $el.addClass('pause');
            $el.removeClass('inactive');
        };

        PlayPauseButton.listenTo(EventDispatcher, 'ready', enable);
        $el.click(function() {
            if ($el.is('.play')) {
                $el.removeClass('play');
                $el.addClass('pause');
                EventDispatcher.trigger('play');
            }
            else if ($el.is('.pause')) {
                $el.removeClass('pause');
                $el.addClass('play');
                EventDispatcher.trigger('pause');
            }
        });

        return PlayPauseButton;
    }
);