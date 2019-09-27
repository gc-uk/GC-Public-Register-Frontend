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
    currentURL = utils.getFullURL(req)
    let query = req.session.data['personal-search']

    if (query === '') {
        res.redirect('/personal/full')
    } else {

        const searchPersonalRegister = require('../data/azuresql/searchPersonalRegister');
        let data = searchPersonalRegister(query);
        var registerData = "";

        data.then(result => {
            registerData = result;
            res.render("personal/results", {
                personalactive,
                registerData
            });
        }).catch(err => {
            console.log(err);
        });
    }
}

exports.personal_full_get = function (req, res) {
    currentURL = utils.getFullURL(req)
    let query = req.session.data['personal-search']

    const fullPersonalRegister = require('../data/azuresql/getFullPersonalRegister');
    let data = fullPersonalRegister();
    var registerData = "";

    data.then(result => {
        registerData = result;
        res.render("personal/results", {
            personalactive,
            registerData
        });
    }).catch(err => {
        console.log(err);
    });
}