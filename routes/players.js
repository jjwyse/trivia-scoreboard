/**
 * PUT on this function increments player's score by 1
 * Created by Jon Jekeli on 3/17/14.
 */
exports.incrementByOne = function(db) {
    return function (req, res) {
        var players = db.get('players');
        players.update(
            { nickname: req.params.nickname },
            {
                $inc: { score: 1 }
            }
        );
       players.find({}, {}, function(err, docs){
            console.log("JSON Updated" + JSON.stringify(docs));
            res.json(docs);
        });
    };
};

/**
 * PUT on this function decrements player's score by 1
 * Created by Jon Jekeli on 3/17/14.
 */
exports.decrementByOne = function(db) {
    return function (req, res) {
        var players = db.get('players');
        players.update(
            { nickname: req.params.nickname },
            {
                $inc: { score: -1}
            }
        );
        players.find({}, {}, function(err, docs){
            console.log("JSON Updated" + JSON.stringify(docs));
            res.json(docs);
        });
    };
};

/**
 * PUT on this function allows setting a players score to a specific number
 * Created by Jon Jekeli on 3/17/14.
 */
exports.set = function(db) {
    return function (req, res) {
        var newScore = req.params.newScore;

        var players = db.get('players');
        players.update(
            { nickname: req.params.nickname },
            {
                $set: { score: newScore }
            }
        );
        players.find({}, {}, function(err, docs){
            console.log("JSON Updated" + JSON.stringify(docs));
            res.json(docs);
        });
    };
};