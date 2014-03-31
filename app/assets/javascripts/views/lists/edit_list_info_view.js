ListsEditListInfoView = Backbone.View.extend({
    events: {
        'click #save_btn': 'handleSubmit',
        'click .nav': 'navigate',
        'click #delete_list': 'deleteList',
        'blur .list_info_input': 'updateListInfo'
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
    },

    createListing: function (selected_estab) {
        console.log('Event create listing caught in Info View');
        console.log(selected_estab);

        this.updateListInfo();
        // do all the great stuff like first make sure listing details are saved to list model,
        // then make sure the list is saved
        // then save the listing with the establishment id
        // these should probably all be broken out into their own methods on this view

        // ??? Should updateListInfo always save to server or should we wait for a listing to be added first?


    },

    updateListInfo: function () {
        // Set the List model attrs on client
        var title = this.model.get('wish_list') ? 'Wish List' : $('#title_input').val();
        var description = $('#description_input').val();
        var attrs = { 
            'title': title,
            'description': description
        };
        this.model.set(attrs);        
    },

    handleSubmit: function (e) {
        e.preventDefault();
        console.log('submit btn')
        this.updateListInfo();

        // this.model.save({}, { success: function (model, res) {
        //     App.navigate(model.get('redirect_url'), { trigger: true });
        // } });
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.currentTarget.pathname, { trigger: true });
    },

    deleteList: function () {
        if (CurrentUser.logged_in()) {
            var delete_list = confirm('Are you sure you want to permenantly delete your list?');

            if (delete_list) {
                this.model.destroy();
                App.navigate('/', { trigger: true });
            }
        } else {
            CurrentUser.authenticate();
        }
    }




    // events: {
    //     'click .nav': 'navigate',
    //     'click #delete_list': 'deleteList',
    //     'blur #title_input': 'updateListModelTitle'

    // },

    // // this.model = LIST

    // initialize: function () {
    //     this.render();

    //     this.listenTo(this.model, 'save_listing', this.saveList);

    //     this.lists_edit_list_photo_view = new ListsEditListPhotoContainerView({
    //         el: '#list_photo_container',
    //         model: this.model
    //     });
    // },

    // render: function () {
    //     this.$el.html(render('lists/edit_title', this.model));
    // },

    // navigate: function (e) {
    //     e.preventDefault();
    //     App.navigate(e.currentTarget.pathname, { trigger: true });
    // },

    // deleteList: function () {
    //     if (CurrentUser.logged_in()) {
    //         var delete_list = confirm('Are you sure you want to permenantly delete your list?');

    //         if (delete_list) {
    //             this.model.destroy();
    //             App.navigate('/', { trigger: true });
    //         }
    //     } else {
    //         CurrentUser.authenticate();
    //     }
    // },

    // updateListModelTitle: function () {
    //     console.log('Edit Title: Updating model title')
    //     console.log($('#title_input').val())

    //     this.model.set('title', $('#title_input').val());
    // },

    // saveList: function (listing) {
    //     console.log('Edit title: Saving List');
    //     console.log(listing)
    //     // this.model.save({}, { success: $.proxy(this.saveListing, this) });
    // }
});