CommentsIndexCommentFormView = Backbone.View.extend({
    events:{
        'submit': 'handleSubmit'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('comments/index_comment_form'));
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var body = e.target[0].value;

        this.new_comment = new Comment({
            body: body,
            establishment_id: this.model.id
        });
        
        this.new_comment.save({}, {success: updateCollection});

        var that = this;
        
        function updateCollection (model, response, options) {
            that.collection.add(model);
        }

    }
});
