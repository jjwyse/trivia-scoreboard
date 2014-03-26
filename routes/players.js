/**
 * Checks that a value is an integer
 * @param n
 * @returns {boolean}
 */
function isInt(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
}

/**
 * Update players in db
 * @param db Mongo DB pointer
 * @param res Response
 * @param nickname Player nickname
 * @param isSet Whether this is a set operation (false if this is an increment/decrement)
 * @param value Value to set/increment/decrement
 */
function updatePlayers(db, res, nickname, isSet, value) {
    var players = db.get('players');
    if (isSet) {
        players.update(
            { nickname: nickname },
            {
                $set: { score: parseInt(value) }
            }
        );
    }
    else {
        players.update(
            { nickname: nickname },
            {
                $inc: { score: value }
            }
        );
    }
    players.find({}, {}, function (err, docs) {
        console.log("JSON Updated" + JSON.stringify(docs));
        res.json(docs);
    });
}

/**
 * PUT on this function updates the players score depending on query parameters
 * Created by Jon Jekeli on 3/17/14.
 */
exports.update = function (db) {
    return function (req, res) {
        var valueOp = req.query.value;
        if (valueOp == null) {
            res.json(400, "{errorMessage: Invalid syntax; needs a ?value=x query parameter}");
        }
        else {
            if (valueOp == "plus") {
                updatePlayers(db, res, req.params.nickname, false, 1);
            }
            else if (valueOp == "minus") {
                updatePlayers(db, res, req.params.nickname, false, -1);
            }
            else if (isInt(valueOp)) {
                updatePlayers(db, res, req.params.nickname, true, valueOp);
            }
            else {
                res.json(400, "{errorMessage: Invalid syntax; available values for the value query parameter are: 'plus', 'minus', or any integer}");
            }
        }
    };
};

/**
 * GET request to {base_url}/players
 *
 * @param db The Mongo db object
 */
exports.retrieve = function (db) {
    return function (req, res) {
        var players = db.get('players');

        players.find({}, {}, function (e, players) {
            if (players == null) {
                res.render('500', {"title": "Oh shit...", "reason": "no players found in the database"});
            }
            else {
                //sort players by score before rendering
                players.sort(function (a, b) {
                    return parseInt(b.score) - parseInt(a.score)
                });

                //res.render('players', {"title": "111 Players", "players": players});
                res.send(players);
            }
        });
    };
};