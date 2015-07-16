define(
    [
        'backbone'
    ],
    function(
        Backbone
    ) {
        var $el = $('.player__visualization__progress');

        var ProgressBar = _.extend({}, Backbone.Events);

        var computeProgress = function(e) {
            var x = Math.round(e.pageX - $el.offset().left);
            return Math.round(100 * x/$el.width());
        };

        var displayProgress = function(progress) {
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
        };

        var setProgress = function(e) {
            var progress = computeProgress(e);
            displayProgress(progress);
        };

        $el
            .mousedown(function() {
                $el
                    .mousemove(function(e) {
                        $el.css('cursor', 'default');
                        setProgress(e);
                    })
                    .mouseup(function() {
                        $el.off('mousemove');
                    });
            })
            .click(function(e) {
                setProgress(e);
            });

        return ProgressBar;
    }
);