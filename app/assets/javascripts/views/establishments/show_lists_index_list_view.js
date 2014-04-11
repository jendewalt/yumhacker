EstablishmentsShowListsIndexListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'paginate', this.paginate);
        this.listenTo(this.model, 'new_listing', this.updateCollection);

        var params = this.collection.predicate();

        this.collection.fetch({ reset: true, data: params });
    },

    render: function () {
        this.changeHeadInfo();
        if (this.collection.length > 0) {
            this.$el.html('');

            this.collection.each(function (list){
                this.renderList(list);
            }, this);
            window.scrollTo(0,0);
        } else {
            this.$el.html(render('establishments/show_lists_index_list_no_results', this.model));
        }
    },

    renderList: function (list) {
        var list_view = new ListsIndexListView({
            tagName: 'li',
            model: list,
            favorites: this.collection.favorites
        });

        if (list.get('type') === 'WishList') {
            this.$el.prepend(list_view.el);
        } else {
            this.$el.append(list_view.el);            
        }
    },

    paginate: function (e) {
        this.collection.requested_page = e;
        var params = this.collection.predicate();
        this.collection.fetch({ reset: true, data: params });
    },

    updateCollection: function (e) {
        var params = this.collection.predicate();
        this.collection.fetch({ reset: true, data: params });
    },

    changeHeadInfo: function () {
        this.title = this.model.get('name') + ' | ' + this.model.get('city') + ' Restaurants | YumHacker';       
        this.description = this.model.get('name') + ' is recommended on ' + this.collection.length + ' Yum Lists on YumHacker.'

        App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);
    }
});
