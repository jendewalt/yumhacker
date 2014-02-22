Listing = Backbone.Model.extend({
    initialize: function () {
        if (this.get('comment')) {
            this.comment = new Comment();
            this.comment.set(this.get('comment'));            
        }
    }
});
