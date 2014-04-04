ListsEditListInfoView = Backbone.View.extend({
    events: {
        // 'click #save_btn': 'handleSubmit',
        // 'click .nav': 'navigate',
        // 'click #delete_list': 'deleteList',
        // 'blur .list_info_input': 'updateListInfo'
    },

    initialize: function () {
        this.lists_edit_title_view = new ListsEditTitleView({
            el: '#list_title_container',
            model: this.model
        });

        this.lists_edit_description_view = new ListsEditDescriptionView({
            el: '#list_description_container',
            model: this.model
        });

        this.listenTo(this.model.listings, 'create_listing', this.createListing);
        this.listenTo(this.model, 'update_list_info', this.updateListInfo);
        this.listenTo(this.model, 'submit_list', this.handleSubmit);
    },

    createListing: function (selected_estab) {
        this.updateListInfo();
        this.saveList(selected_estab);
        // do all the great stuff like first make sure listing details are saved to list model,
        // then make sure the list is saved
        // then save the listing with the establishment id
        // these should probably all be broken out into their own methods on this view

        // ??? Should updateListInfo always save to server or should we wait for a listing to be added first?

    },

    updateListInfo: function (establishment) {
        // Set the List model attrs on client
        var title = this.model.get('wish_list') ? 'Wish List' : $('#title_input').val();
        var description = $('#description_input').val();

        console.log('update list')
        this.model.set({ 
            'title': title,
            'description': description
        }); 
    },

    saveList: function (establishment) {
        this.model.save({}, { success: $.proxy(function () {
            if (establishment) {
                this.saveListing(establishment);
            }
        }, this) });       
    },

    saveListing: function (establishment) {
        var listing = new Listing({
            establishment_id: establishment.get('id'),
            list_id: this.model.get('id')
        });

        listing.save();
        ModalView.hide();
    }, 

    handleSubmit: function () {
        this.updateListInfo();

        this.model.save({}, 
            { success: function (model) {
                console.log('SAVING')
                App.navigate('/lists/' + model.get('id'), { trigger: true }) } 
            });
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.currentTarget.pathname, { trigger: true });
    }
});