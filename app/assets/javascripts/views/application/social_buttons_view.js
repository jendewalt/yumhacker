SocialButtonsView = Backbone.View.extend({ 
    events: {
        'click #facebook_share': 'postToFBFeed'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.append(render('application/social_buttons', this.model));
    },

    postToFBFeed: function (e) {
        e.preventDefault();
        
        var obj = {
            method: 'feed',
            link: window.location.origin + '/' + this.model.get('path'),
            picture: window.location.origin + this.model.get('small_url'),
            name: this.model.get('title'),
            caption: '',
            description: this.model.get('description')
        };

        FB.ui(obj);
    }

});