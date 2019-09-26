const utils = require('../utils.js');
var businessactive = 'govuk-header__navigation-item--active';


exports.business_home_get = function (req, res) {

    currentURL = utils.getFullURL(req)
    const getSummaryRegisterData = require('../data/azuresql/getSummaryRegisterData');
    let summaryRegisterData = getSummaryRegisterData();
    var registerData = "";
    summaryRegisterData.then(result => {
        registerData = result.summaryRegisterData.recordset[0];
        res.render("business/index", {
            businessactive,
            registerData
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.business_details_get = function (req, res) {
    res.render("business/detail/index", {
        businessactive
    });
}

exports.business_download_get = function (req, res) {
    res.render("business/download", {
        businessactive
    });
}

exports.business_search_post = function (req, res) {
    res.redirect("/business/results");
}

exports.business_results_get = function (req, res) {

    // Do the search and display the results to the user

    currentURL = utils.getFullURL(req)
    let query = req.session.data['business-search']

    const searchBusinessRegister = require('../data/azuresql/searchBusinessRegister');
    let data = searchBusinessRegister(query);
    var registerData = "";

    data.then(result => {
        registerData = result;
        res.render("business/results", {
            businessactive,
            registerData
        });
    }).catch(err => {
        console.log(err);
    });

}

exports.business_domainnames_get = function (req, res) {
    res.render("business/detail/domain-names", {
        businessactive
    });
}

exports.business_tradingnames_get = function (req, res) {
    res.render("business/detail/trading-names", {
        businessactive
    });
}

exports.business_premises_get = function (req, res) {
    res.render("business/detail/premises", {
        businessactive
    });
}

exports.business_download_get = function (req, res) {
    res.render("business/download", {
        businessactive
    });
}

exports.business_full_get = function (req, res) {
    res.render("business/full", {
        businessactive
    });
}