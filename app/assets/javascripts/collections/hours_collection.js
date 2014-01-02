HoursCollection = Backbone.Collection.extend({
    model: Hours,

    comparator: 'open_in_minutes'
});
