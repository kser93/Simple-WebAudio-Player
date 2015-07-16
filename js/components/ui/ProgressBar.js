define(
    [
        'backbone'
    ],
    function(
        Backbone
    ) {
        var $el = $('.player__visualization__progress');

        var ProgressBar = _.extend({
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

        var setProgress = function(e) {
            var x = Math.round(e.pageX - $el.offset().left);

            return Math.round(100 * x/$el.width());
        };

        $el
            .mousedown(function() {
                $el
                    .mousemove(function(e) {
                        $el.css('cursor', 'default');
                        var progress = setProgress(e);
                        ProgressBar.displayProgress(progress);
                    })
                    .mouseup(function() {
                        $el.off('mousemove');
                    });
            })
            .click(function(e) {
                var progress = setProgress(e);
                ProgressBar.displayProgress(progress);
            });

        return ProgressBar;
    }
);