define(
    [
        'backbone',
        'components/ui/Volume/model',
        'components/EventDispatcher'
    ],
    function(
        Backbone,
        model,
        EventDispatcher
    ) {
        return Backbone.View.extend({
            model: model,
            el: '[class*=controls][class$=volume]',

            initialize: function() {
                this.listenTo(this.model, 'change', function() {
                    EventDispatcher.trigger('setVolume', this.model.get('volume'));
                    this.render();
                });

                this.$el.mousedown(_.bind(function() {
                    this.$el.mousemove(_.bind(function(e) {
                        this.$el.css('cursor', 'default');
                        this.model.set('volume', this.computeVolume(e));
                    }, this));
                    this.$el.mouseup(_.bind(function() {
                        this.$el.off('mousemove');
                    }, this));
                }, this));

                this.$el.click(_.bind(function(e) {
                    this.model.set('volume', this.computeVolume(e));
                }, this));

                this.render();
                return this;
            },

            render: function() {
                this.displayVolume(this.model.get('volume'));
                return this;
            },

            computeVolume: function(e) {
                var degree = 0,
                    target= {
                        x: e.pageX - this.$el.offset().left,
                        y: e.pageY - this.$el.offset().top
                    },
                    center = {
                        x: this.$el.width() / 2,
                        y: this.$el.height() / 2
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
            },

            displayVolume: function(volume) {
    
                var degrees = volume * 3.6;
    
                if (degrees <= 180){
                    this.$el.css(
                        'background',
                        'linear-gradient(' + (270+degrees) + 'deg, transparent 50%, #C0C0C0 50%),' +
                        'linear-gradient(270deg, #C0C0C0 50%, transparent 50%),' +
                        '#ED9939'
                    );
                }
                else {
                    this.$el.css(
                        'background',
                        'linear-gradient(' + (degrees - 270) + 'deg, transparent 50%, #ED9939 50%),' +
                        'linear-gradient(90deg, #ED9939 50%, transparent 50%),' +
                        '#C0C0C0'
                    );
                }
                this.$el.find('[class$=value]').text(volume+'%');
            }

    });
    }
);