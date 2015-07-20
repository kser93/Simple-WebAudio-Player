define(
    [
        'backbone'
    ],
    function(
        Backbone
    ) {

        return Backbone.Model.extend({
            defaults: {
                currentTime: undefined,
                duration: undefined,
                progress: undefined
            },

            toMinutesAndSeconds: function(time) {

                var format = function(value) {
                    if (value < 10) {
                        return '0' + value.toString();
                    }
                    return value.toString();
                };

                var minutes = format(Math.floor(time / 60)),
                    seconds = format(Math.round(time % 60));

                return minutes + ':' + seconds;
            }
        });
    }
);