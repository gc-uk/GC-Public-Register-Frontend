const utils = require('../utils.js');
var currentURL;


exports.home_get = function (req, res) {
        currentURL = utils.getFullURL(req)
        const getSummaryRegisterData = require('../data/azuresql/getSummaryRegisterData');
        let summaryRegisterData = getSummaryRegisterData();
        var registerData = "";
        summaryRegisterData.then(result => {
                registerData = result.summaryRegisterData.recordset[0];
                res.render("index", {
                        currentURL,
                        registerData
                });
        }).catch(err => {
                console.log(err);
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


exports.redirectForActivity_get = function (req, res) {

        // Get the id
        var activity = req.params.id;

        // Get the config
        const d = require('../data/activity.json');

        var record = d.activities.filter(function (value) {
                return value.activity === activity;
        });

        res.redirect(record[0].url)
}