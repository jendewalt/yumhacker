ListsEditUserImagesListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new PhotoCollection({});
        this.listenTo(this.collection, 'reset', this.render);
        this.collection.fetch({ reset: true, data: { user_id: CurrentUser.id } });
    },

    render: function () {
        this.$el.html(render('lists/edit_list_photo_selector_container', this.model));

        this.collection.each(function (image) {
            this.renderUserImage(image);
        }, this);
    },

    renderUserImage: function (image) {
        var image_view = new ListEditUserImageView({
            tagName: 'li',
            model: image,
            list: this.model
        });

        this.$el.append(image_view.el);
    }
});