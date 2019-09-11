const utils = require('../utils.js');
var currentURL;


exports.home_get = function (req, res) {
        currentURL = utils.getFullURL(req)

        res.render("index", {
                currentURL
        });
}

exports.accessibility_get = function (req, res) {
        res.render("accessibility");
}

exports.feedback_get = function (req, res) {
        res.render("feedback");
}

exports.help_get = function (req, res) {
        res.render("help");
}

exports.feedback_post = function (req, res) {

        if (req.session.data['telephone'] === "") {
                // Send feedback through Notify
                res.redirect("/feedback-thanks");
        } else {
                // No submission as a bot has completed the hidden field
                res.redirect("/feedback");
        }
}

exports.feedback_thanks_get = function (req, res) {

        res.render("feedback-thanks");
}

exports.performance_get = function (req, res) {
        res.render("performance");
}