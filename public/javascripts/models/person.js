/**
 * This file details the Person Backbone Model object
 * Created by Jon Jekeli on 3/25/14.
 */

window.Person = Backbone.Model.extend({
    urlRoot: "/players",

    idAttribute: "nickname",

    defaults: {
        nickname: '',
        score: 0
    }
});

window.PersonCollection = Backbone.Collection.extend({
    model: Person,
    url: "/players"
})