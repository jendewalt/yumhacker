ApplicationModalView = Backbone.View.extend({
    events: {
        'click .cancel': 'hide'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('application/modal'));
    },

    show: function (view) {
        this.view = view;
        this.$('inner_modal_content').html(view.el);
        this.$el.show();
        console.log(this.view);
    },

    hide: function () {
        console.log('hiding')
        var that = this;
        console.log(this)
        this.$el.fadeOut('60', function () {
            that.view.remove(); 
            that.$('.inner_modal').append($('<div>', { id: 'inner_modal_content' }));
        });
    },

    addListingToListModal: function (listing) {
        ModalView.show(new ListsAddToListModalView({ 
            el: '#inner_modal_content',
            model: listing
        }));        
    },

    createNewListModal: function (listing) {
        ModalView.show(new ListsCreateNewListModalView({
            el: '#inner_modal_content',
            model: listing
        }));
    }
});
