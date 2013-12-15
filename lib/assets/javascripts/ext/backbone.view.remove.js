Backbone.View.prototype.remove = function () {
    // remove any subviews
    _.each(this, function (prop) {
        if(prop instanceof Backbone.View) {
            prop.remove();
        }
    });

    // do the default Backbone remove
    this.$el.remove();
    this.stopListening();
    return this;
};
