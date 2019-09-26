const utils = require('../utils.js');
var premisesactive = 'govuk-header__navigation-item--active';

exports.premises_home_get = function (req, res) {
  

    currentURL = utils.getFullURL(req)
    const getSummaryRegisterData = require('../data/azuresql/getSummaryRegisterData');
    let summaryRegisterData = getSummaryRegisterData();
    var registerData = "";
    summaryRegisterData.then(result => {
            registerData = result.summaryRegisterData.recordset[0];
            res.render("premises/index", {
                premisesactive,
                registerData
            });
    }).catch(err => {
            console.log(err);
    });
}


exports.premises_details_get = function (req, res) {
    res.render("premises/detail/index", {
        premisesactive
    });
}

exports.premises_download_get = function (req, res) {
    res.render("premises/download", {
        premisesactive
    });
}

exports.premises_search_post = function (req, res) {
    console.log('post search')
    res.redirect("/premises/results");
}

exports.premises_results_get = function (req, res) {
    console.log('get results')
    res.render("premises/results", {
        premisesactive
    });
}

exports.premises_full_get = function (req, res) {
    res.render("premises/full", {
        premisesactive
    });
}