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

    currentURL = utils.getFullURL(req)
    var query = req.params.id;

    if (isNaN(query)) {
        res.redirect('/')
    } else {

        const premisesData = require('../data/azuresql/getPremisesData');
        let data = premisesData(query);
        var registerData = "";

        data.then(result => {
            if (result.Premises.recordset.length === 0) {
                res.redirect('/')
            } else {
                registerData = result;
                res.render("premises/detail/index", {
                    premisesactive,
                    registerData
                });
            }

        }).catch(err => {
            res.redirect('/')
        });
    }
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


    currentURL = utils.getFullURL(req)
    let query = req.session.data['premises-search']

    if (query === '') {       
        res.redirect('/premises/full')
    } else {

        const searchPremisesRegister = require('../data/azuresql/searchPremisesRegister');
        let data = searchPremisesRegister(query);
        var registerData = "";

        data.then(result => {
            registerData = result;
            res.render("premises/results", {
                premisesactive,
                registerData
            });
        }).catch(err => {
            console.log(err);
        });
    }
}

exports.premises_full_get = function (req, res) {


    const fullPremisesRegisterData = require('../data/azuresql/getFullPremisesRegister');
    let data = fullPremisesRegisterData();
    var registerData = "";

    data.then(result => {
        registerData = result;
        res.render("premises/results", {
            premisesactive,
            registerData
        });
    }).catch(err => {
        console.log(err);
    });
}