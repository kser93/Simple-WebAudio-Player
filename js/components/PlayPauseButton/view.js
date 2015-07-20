define(
    [
        'backbone',
        'components/PlayPauseButton/model',
        'components/PlayPauseButton/states',
        'components/EventDispatcher'
    ],
    function(
        Backbone,
        model,
        states,
        EventDispatcher
    ) {
        return Backbone.View.extend({
            model: model,
            el: '[class*=controls][class*=playpause]',
            events: {
                'click': 'updateState'
            },

            initialize: function() {
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(EventDispatcher, 'ready', this.play);
                this.listenTo(EventDispatcher, 'ended', this.pause);

                this.render();
                return this;
            },

            render: function() {
                _.each(states, function(state) {
                    if (this.$el.hasClass(state.class)) {
                        this.$el.removeClass(state.class);
                    }
                }, this);
                this.$el.addClass(this.model.get('state').class);
                return this;
            },

            updateState: function() {
                switch (this.model.get('state')) {
                    case states.play:
                        this.pause();
                        break;
                    case states.pause:
                        this.play();
                        break;
                    case states.inactive:
                        //clicked on inactive button, do nothing
                        break;
                }
            },

            play: function() {
                this.model.set(
                    'state',
                    states.play
                );
                EventDispatcher.trigger('play');
            },

            pause: function() {
                this.model.set(
                    'state',
                    states.pause
                );
                EventDispatcher.trigger('pause');
            }
        });
    }
);