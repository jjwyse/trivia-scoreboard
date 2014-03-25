/**
 * Decrements the specified players score by one
 *
 * @param playerName The player's name
 */
function decrementScore(playerName) {
    $.ajax({
        url: '/players/' + playerName + '/score?value=minus',
        type: 'PUT',
        success: function (result) {
            console.log("Decremented score, new scores: " + result);
            // JJW - hack - revisit
            window.location.href = '/players';
        }
    });
}

/**
 * Increments the specified players score by one
 *
 * @param playerName The player's name
 */
function incrementScore(playerName) {
    $.ajax({
        url: '/players/' + playerName + '/score?value=plus',
        type: 'PUT',
        dataType: 'json',
        success: function (result) {
            console.log("Incremented score, new scores: " + result);
            // JJW - hack - revisit
            window.location.href = '/players';
        }
    });
}
