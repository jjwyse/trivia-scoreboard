/*
 * GET home page.
 */
exports.index = function(db) {
    return function (req, res) {
        var players = db.get('players');
        players.find({}, {}, function(e, players){
            res.render('index', {"title": "111 Trivia Scoreboard", "players": players});
        });
    };
};
