define(
    [
        'backbone',
        'components/ui/Screen/states'
    ],
    function(
        Backbone,
        states
    ) {
        return Backbone.Model.extend({
            defaults: {
                meta: null,
                visualization: states.cover
            }
        });
    }
);