EstablishmentsShowView = Backbone.View.extend({
	
	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
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
	}
});
