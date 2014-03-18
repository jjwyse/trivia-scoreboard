
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
    if(isSet) {
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
    players.find({}, {}, function(err, docs){
        console.log("JSON Updated" + JSON.stringify(docs));
        res.json(docs);
    });
}

/**
 * PUT on this function updates the players score depending on query parameters
 * Created by Jon Jekeli on 3/17/14.
 */
exports.update = function(db) {
    return function (req, res) {
        var valueOp = req.query.value;
        if(valueOp == null) {
            res.json("Error: Invalid syntax; needs a ?value=x query parameter");
        }
        else {
            if(valueOp == "plus") {
                updatePlayers(db, res, req.params.nickname, false, 1);
            }
            else if(valueOp == "minus") {
                updatePlayers(db, res, req.params.nickname, false, -1);
            }
            else if(isInt(valueOp)) {
                updatePlayers(db, res, req.params.nickname, true, valueOp);
            }
            else {
                res.json("Error: Invalid syntax; available values for the value query parameter are: 'plus', 'minus', or any integer");
            }
        }
    };
};