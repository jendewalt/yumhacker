EstablishmentsShowEstablishmentCategoriesView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.collection.each(function (category, i) {
            category.formatted_name = category.get('name') + (this.collection.length > i + 1 ? ',' : '');
            this.$el.append(render('establishments/establishment_category', category));
        }, this);
    }
});