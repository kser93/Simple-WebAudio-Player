define(
    [
        'backbone'
    ],
    function(
        Backbone
    ) {
        var $el = $('.player__controls__volume');

        var VolumeControl = _.extend({
            displayVolume: function(volume) {
                if (volume < 0) {
                    volume = 0;
                }
                else if (volume > 100) {
                    volume = 100;
                }
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
            }
        }, Backbone.Events);

        var setVolume = function(e) {
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

            return Math.round(degree / 3.6);
        };

        $el
        .mousedown(function() {
            $el
            .mousemove(function(e) {
                $el.css('cursor', 'default');
                var volume = setVolume(e);
                VolumeControl.displayVolume(volume);
            })
            .mouseup(function() {
                $el.off('mousemove');
            });
        })
        .click(function(e) {
            var volume = setVolume(e);
            VolumeControl.displayVolume(volume);
        });

        return VolumeControl;
    }
);