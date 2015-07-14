define(['backbone'], function(Backbone) {
    var EventAggregator = _.extend({}, Backbone.Events);

    return EventAggregator;
});