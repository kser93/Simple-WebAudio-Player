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
            $el.removeClass('play');
            $el.removeClass('inactive');
        };

        var setPauseStyle = function() {
            $el.removeClass('pause');
            $el.addClass('play');
        };

        var setPlayStyle = function() {
            $el.removeClass('play');
            $el.addClass('pause');

        };

        PlayPauseButton.listenTo(EventDispatcher, 'ready', enable);
        PlayPauseButton.listenTo(EventDispatcher, 'ended', setPauseStyle);

        $el.click(function() {
            if ($el.is('.play')) {
                setPlayStyle();
                EventDispatcher.trigger('play');
            }
            else if ($el.is('.pause')) {
                setPauseStyle();
                EventDispatcher.trigger('pause');
            }
        });

        return PlayPauseButton;
    }
);