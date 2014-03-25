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
            alert(result);
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
        success: function (result) {
            alert(result);
        }
    });
}
