const utils = require('../utils.js');
var personalactive = 'govuk-header__navigation-item--active';

exports.personal_home_get = function (req, res) {

    currentURL = utils.getFullURL(req)
    const getSummaryRegisterData = require('../data/azuresql/getSummaryRegisterData');
    let summaryRegisterData = getSummaryRegisterData();
    var registerData = "";
    summaryRegisterData.then(result => {
            registerData = result.summaryRegisterData.recordset[0];
            res.render("personal/index", {
                personalactive,
                registerData
            });
    }).catch(err => {
            console.log(err);
    });
}


exports.personal_details_get = function (req, res) {
    res.render("personal/detail/index", {
        personalactive
    });
}

exports.personal_download_get = function (req, res) {
    res.render("personal/download", {
        personalactive
    });
}

exports.personal_search_post = function (req, res) {
    console.log('post search')
    res.redirect("/personal/results");
}

exports.personal_results_get = function (req, res) {
    console.log('get results')
    res.render("personal/results", {
        personalactive
    });
}

exports.personal_full_get = function (req, res) {
    res.render("personal/full", {
        personalactive
    });
}