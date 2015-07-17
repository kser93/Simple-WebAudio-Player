define(
    [
        'backbone',
        'components/EventDispatcher'
    ],
    function(
        Backbone,
        EventDispatcher
    ) {
        var $progress = $('[class*=visualization][class*=progress]'),
            $time = $('[class*=visualization][class*=time]');

        var ProgressControl = _.extend({}, Backbone.Events);

        var displayProgress = function(progress) {
            if (progress < 0) {
                progress = 0;
            }
            else if (progress > 100) {
                progress = 100;
            }
            $progress.css(
                'background',
                'linear-gradient(to right, #ED9939 ' + progress + '%, transparent ' + progress + '%), ' +
                '#C0C0C0'
            );
        };

        var displayCurrentTime = function(time) {
            $time.find('[class$=current]').text(time.minutes + ':' + time.seconds);
        };

        var displayDuration = function(time) {
            $time.find('[class$=duration]').text(time.minutes + ':' + time.seconds);
        };

        var getMinutesAndSecondsFromSeconds = function(time) {
            var format = function(value) {
                if (value < 10) {
                    return '0' + value.toString();
                }
                return value.toString();
            };
            return {
                minutes: format(Math.floor(time / 60)),
                seconds: format(Math.round(time % 60))
            };
        };

        ProgressControl.listenTo(EventDispatcher, 'ready', function(args) {
            displayCurrentTime({minutes: '00', seconds: '00'});
            displayDuration(getMinutesAndSecondsFromSeconds(args.duration));
        });
        ProgressControl.listenTo(EventDispatcher, 'changeProgress', function(args) {
            displayProgress(args.progress);
            displayCurrentTime(getMinutesAndSecondsFromSeconds(args.currentTime));
        });
        return ProgressControl;
    }
);