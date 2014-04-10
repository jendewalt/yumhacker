HomePageCreateListView = Backbone.View.extend({
    events: {
        'click .new_list_btn': 'createNewList'
    },

    initialize: function () {
        this.prompts = [
            'Cheap & Delicious',
            'Great for Game Day',
            'Perfect for Date Nite',
            'Spiciest Sichuan',
            'Best Tacos',
            'Best Views',
            'Top 10 Burgers',
            'Girls Night Out',
            'Top Hidden Gems',
            'Hippest Dive Bars',
            'Off the Radar Winners',
            'Delicious Dim Sum',
            'Lots-a-Pasta',
            'Delis that Deliver'
        ]
        this.render();
    },

    render: function () {
        var prompt = { prompt: this.prompts[Math.floor(Math.random() * (this.prompts.length - 1))] };
        this.$el.html(render('home_page/create_list', prompt));
    },

    createNewList: function (e) {
        e.preventDefault();
        
        if (CurrentUser.logged_in()) {
            App.navigate('/lists/new', { trigger: true });            
        } else {
            console.log('hello')
            CurrentUser.authenticate();
        }
    }
});