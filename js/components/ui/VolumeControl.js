define(
    [
        'backbone',
        'components/EventDispatcher'
    ],
    function(
        Backbone,
        EventDispatcher
    ) {
        var $el = $('.player__controls__volume');

        var VolumeControl = _.extend({}, Backbone.Events);

        var computeVolume = function(e) {
            var degree = 0,
                target= {
                    x: e.pageX - $el.offset().left,
                    y: e.pageY - $el.offset().top
                },
                center = {
                    x: $el.width() / 2,
                    y: $el.height() / 2
                },
                delta = {
                    x: target.x - center.x,
                    y: target.y - center.y
                };

            if (delta.x <= 0 && delta.y > 0) {
                //quarter 1
                degree = Math.round(
                    -Math.atan((delta.x / delta.y)) * 180 / Math.PI
                );
            }
            else if (delta.x < 0 && delta.y <= 0) {
                //quarter 2
                if (delta.y == 0) {
                    degree = 90;
                }
                else {
                    degree = Math.round(
                        180 - Math.atan((delta.x / delta.y)) * 180 / Math.PI
                    );
                }
            }
            else if (delta.x >= 0 && delta.y < 0) {
                //quarter 3
                degree = Math.round(
                    180 - Math.atan((delta.x / delta.y)) * 180 / Math.PI
                );
            }
            else if (delta.x > 0 && delta.y >= 0) {
                //quarter 4
                if (delta.y == 0) {
                    degree = 270;
                }
                else {
                    degree = Math.round(
                        360 - Math.atan((delta.x / delta.y)) * 180 / Math.PI
                    );
                }
            }

            var volume = Math.round(degree / 3.6);
            if (volume < 5) {
                volume = 0;
            }
            else {
                volume = Math.ceil(volume / 5) * 5;
            }
            return volume;
        };

        var displayVolume = function(volume) {

            var degrees = volume * 3.6;

            if (degrees <= 180){
                $el.css(
                    'background',
                    'linear-gradient(' + (270+degrees) + 'deg, transparent 50%, #C0C0C0 50%),' +
                    'linear-gradient(270deg, #C0C0C0 50%, transparent 50%),' +
                    '#ED9939'
                );
            }
            else {
                $el.css(
                    'background',
                    'linear-gradient(' + (degrees - 270) + 'deg, transparent 50%, #ED9939 50%),' +
                    'linear-gradient(90deg, #ED9939 50%, transparent 50%),' +
                    '#C0C0C0'
                );
            }
            $el.find('[class$=value]').text(volume+'%');
        };

        var setVolume = function(e) {
            var volume = computeVolume(e);
            displayVolume(volume);
            EventDispatcher.trigger('changeVolume', volume);
        };

        $el
        .mousedown(function() {
            $el
            .mousemove(function(e) {
                $el.css('cursor', 'default');
                setVolume(e);
            })
            .mouseup(function() {
                $el.off('mousemove');
            });
        })
        .click(function(e) {
            setVolume(e);
        });

        return VolumeControl;
    }
);