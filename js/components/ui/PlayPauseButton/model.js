define(
    [
        'backbone',
        'components/ui/PlayPauseButton/states'
    ],
    function(
        Backbone,
        states
    ) {

        return Backbone.Model.extend({
            defaults: {
                state: states.inactive
            }
        });
    }
);