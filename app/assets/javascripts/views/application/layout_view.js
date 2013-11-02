ApplicationLayout = Backbone.View.extend({
  events: {
  },

  initialize: function (options) {
     var controller = options.controller;
     var action = options.action;
     var model = options.model;
     
     this.section_class = controller + '_' + action + '_container';

     this.render();

     this.applicationHeaderView = new ApplicationHeaderView({ el: 'header' });
     this.sectionView = new window[capitalize(controller) + capitalize(action) + 'View']({ el: '.' + this.section_class, model: model });
     // this.applicationFooterView = new ApplicationFooterView({ el: 'footer' });
  },

  render: function () {
     this.$el.html(render('layouts/application', { section_class: this.section_class }));
  }
});
