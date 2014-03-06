EstablishmentsShowView = Backbone.View.extend({
	
	initialize: function () {
        this.listenTo(this.model, 'sync', this.render);
		this.listenTo(this.model, 'sync', this.changeHeadInfo);
        this.model.fetch();
    },

    render: function () {
        this.$el.html(render('establishments/show', this.model));

        this.establishments_show_establishment_info_view = new EstablishmentsShowEstablishmentInfoView({
            el: '#establishment_info_container',
            model: this.model
        });

        this.establishments_show_endorsers_index_view = new EstablishmentsShowEndorsersIndexView({
            el: '#endorsers_list_container',
            model: this.model
        });

        this.comments_index_view = new CommentsIndexView({
            el: '#establishment_comments_container',
            model: this.model
        });

        if (typeof EstablishmentGoogleMap === 'undefined') {
            EstablishmentGoogleMap = new EstablishmentMapView({
                el: '#map_canvas'
            })
        } 
        EstablishmentGoogleMap.model = this.model;
        EstablishmentGoogleMap.render();

        if (!CurrentUser.get('id')) {
            this.authentication_options_view = new AuthenticationOptionsView({
                el: '#login_modal_container'
            });         
        }
	},

    changeHeadInfo: function () {
        this.title = this.model.get('name') + ' | ' + this.model.get('city') + ' Restaurants | YumHacker';       
        this.description = this.model.get('number_endorsements') + ' people are endorsing ' + this.model.get('name') + ' in ' + this.model.get('city') + ', ' + this.model.get('state') + ' on YumHacker.'

        App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);
    }
});
