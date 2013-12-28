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

        $('#comment_input').on('focus', function () {
            $('#comment_form').animate({ 'margin-bottom': 0 }, 200, function () {
                $('#char_counter').animate({ 'opacity': '1' }, 0);
            });
        }).on('keyup', function () {
            $('#char_counter span').html(100 - $(this).val().length);
        });
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var body = e.target[0].value;

        $.trim(body);

        if (CurrentUser.get('id')) {
            if (body && body.length <= 255) {
                this.new_comment = new Comment({
                    body: body,
                    establishment_id: this.model.get('id')
                });
                
                this.new_comment.save({}, {success: updateCollection});

                $('#comment_input').val('');            
            } else {
                alert('Comments cannot be blank and have a character limit of 100 characters.');
            }
        } else {
            this.showAuthenticationOpts();
        }

        var that = this;

        function updateCollection (model, response, options) {
            model.set('created_at', moment().utc().format());
            that.collection.add(model);
        }
    },

    showAuthenticationOpts: function () {
        $('#login_modal_container').fadeIn('60');
    }
});
