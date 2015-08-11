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
            }
        });
    }
);