CommentsIndexCommentFormView = Backbone.View.extend({
    events:{
        'submit': 'handleSubmit'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('comments/index_comment_form', this.model));
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var body = $.trim(e.target[0].value);
        var comment_data = { body: body };

        this['model_type'] = this.model.type.toLowerCase() + '_id';
        comment_data[this['model_type']] = this.model.get('id');      

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
            model.set('created_at', moment().utc().format());
            that.collection.add(model);
        }
    }
});
