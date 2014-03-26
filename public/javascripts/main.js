var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "players"                  : "list"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function () {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
    },

	list: function() {
        var playerList = new PersonCollection();
        playerList.fetch({success: function(){
            $("#content").html(new PlayersListView({model: playerList}).el);
        }});
    }
});

utils.loadTemplate(['HeaderView', 'HomeView', 'PersonView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});