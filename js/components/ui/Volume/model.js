define(
    [
        'backbone'
    ],
    function(
        Backbone
    ) {
        return Backbone.Model.extend({
            defaults: {
                volume: 100
            },

            validate: function(attrs, options) {
                if ((attrs.volume < 0) || (attrs.volume > 100)) {
                    return 'Impossible volume!';
                }
            }
        });
    }
);