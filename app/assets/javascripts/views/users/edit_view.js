UsersEditView = Backbone.View.extend({
    events: {
        'click a.expander': 'openChangePasswordFields',
        'submit': 'showThrobber'
    },

    initialize: function () {
        this.changeHeadInfo();
    },

    openChangePasswordFields: function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#password_fields').show();
    },

    showThrobber: function () {
        $('.update_btn').hide();
        $('.throbber').show();        
    },

    changeHeadInfo: function () {
        this.title = CurrentUser.get('first_name') + ' ' + CurrentUser.get('last_name') + ' | Edit | YumHacker';

        this.description = 'Find ' + Client.get('formatted_address') + ' restaurants and bars endorsed by people you trust. Get restaurant and bar photos, reviews, hours and more!';

        App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);            
    }
});
