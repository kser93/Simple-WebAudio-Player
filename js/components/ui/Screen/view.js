define(
    [
        'backbone',
        'components/ui/Screen/model',
        'components/EventDispatcher'
    ],
    function(
        Backbone,
        model,
        EventDispatcher
    ) {
        return Backbone.View.extend({
            model: model,
            el: '[class*=visualization][class$=screen]',
            events: {
                'dragenter': 'setHover',
                'dragleave': 'removeHover',
                'dragend': 'removeHover',
                'drop': 'loadComposition'
            },

            initialize: function() {
                this.ctx = this.$el[0].getContext('2d');

                this.listenTo(EventDispatcher, 'metaRecognized', function(meta) {
                    this.model.set('meta', meta);
                });

                this.listenTo(this.model, 'change:meta', this.renderMeta);
            },

            setHover: function() {
                this.$el.addClass('js-hover');
            },

            removeHover: function() {
                this.$el.removeClass('js-hover');
            },

            loadComposition: function(e) {
                this.removeHover();
                var file = e.originalEvent.dataTransfer.files[0];
                EventDispatcher.trigger('compositionLoaded', file);
                $('title').text(file.name);
            },

            renderMeta: function() {
                var meta = this.model.get('meta');
                if (!meta) {
                    return;
                }

                var tags = '';
                if (meta.artist) {
                    tags += meta.artist;
                    tags += ' - ';
                }
                if (meta.album) {
                    tags += meta.album;
                    tags += ' - ';
                }
                if (meta.title) {
                    tags += meta.title;
                }
                this.$el.parent().find('[class$=tags]').text(tags);
                if (meta.cover) {
                    this.ctx.drawImage(meta.cover, 230, 0, 500, 500);
                }
            }
        });
    }
);