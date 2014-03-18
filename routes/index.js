/*
 * GET home page.
 */
exports.index = function(db) {
    return function (req, res) {
        var players = db.get('players');

        players.find({}, {}, function(e, players){
            if (players == null) {
                res.render('500', {"title": "Oh shit...", "reason": "no players found in the database"});
            }
            else {
                res.render('index', {"title": "111 Trivia Scoreboard", "players": players});
            }
        });
    };
};
