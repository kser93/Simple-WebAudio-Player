define(
    [
        'backbone',
        'components/ui/Progress/model',
        'components/EventDispatcher'
    ],
    function(
        Backbone,
        model,
        EventDispatcher
    ) {
        return Backbone.View.extend({
            model: model,
            el: '[class*=visualization][class*=progress]',

            initialize: function() {

                this.listenTo(this.model, 'change:progress', this.renderProgress);
                this.listenTo(this.model, 'change:currentTime', this.renderCurrentTime);
                this.listenTo(this.model, 'change:duration', this.renderDuration);

                this.listenTo(EventDispatcher, 'compositionReady', function(args) {
                    this.model.set({
                        currentTime: 0,
                        duration: args.duration
                    });
                });

                this.listenTo(EventDispatcher, 'changeProgress', function(args) {
                    this.model.set({
                        progress: args.progress,
                        currentTime: args.currentTime
                    });
                });

                return this;
            },

            renderProgress: function() {
                var progress = this.model.get('progress');
                this.$el.find('[class$=bar]').css(
                    'background',
                    'linear-gradient(to right, #ED9939 ' + progress + '%, transparent ' + progress + '%), ' +
                    '#C0C0C0'
                );
                return this;
            },

            renderCurrentTime: function() {
                var currentTime = this.model.toMinutesAndSeconds(this.model.get('currentTime'));
                this.$el.find('[class$=time]').find('[class$=current]').text(currentTime);
                return this;
            },

            renderDuration: function() {
                var duration = this.model.toMinutesAndSeconds(this.model.get('duration'));
                this.$el.find('[class$=time]').find('[class$=duration]').text(duration);
                return this;
            }
        });
    }
);