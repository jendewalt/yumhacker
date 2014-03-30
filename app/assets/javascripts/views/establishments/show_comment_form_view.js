EstablishmentShowCommentFormView = Backbone.View.extend({
    events:{
        'submit': 'handleSubmit'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('establishments/show_comment_form', this.model));
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var body = $.trim(e.target[0].value);
        var comment_data = { 
            body: body,
            establishment_id: this.model.get('id')
        };

        if (CurrentUser.logged_in()) {
            if (body) {
                this.new_comment = new Comment( comment_data );
                
                this.new_comment.save({}, {success: updateCollection});           
            } else {
                alert('Comments cannot be blank.');
            }
        } else {
            CurrentUser.authenticate();
        }

        var that = this;

        function updateCollection (model, response, options) {
            $('#comment_input').val('');
            model.set('updated_at', moment().utc().format());
            model.format_time();
            that.collection.add(model);
        }
    }
});
