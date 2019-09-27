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

    currentURL = utils.getFullURL(req)
    var query = req.params.id;

    if (isNaN(query)) {
        res.redirect('/')
    } else {

        const accountData = require('../data/azuresql/getaccountdata');
        let data = accountData(query);
        var registerData = "";

        data.then(result => {
            if (result.account.recordset.length === 0) {
                res.redirect('/')
            } else {
                registerData = result;
                res.render("business/detail/index", {
                    businessactive,
                    registerData
                });
            }

        }).catch(err => {
            res.redirect('/')
        });
    }

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

    if (query === '') {
        res.redirect('/business/full')
    } else {

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

}

exports.business_domainnames_get = function (req, res) {

    currentURL = utils.getFullURL(req)
    var query = req.params.id;

    if (isNaN(query)) {
        res.redirect('/')
    } else {

        const accountData = require('../data/azuresql/getBusinessDomainNameData');
        let data = accountData(query);
        var registerData = "";

        data.then(result => {
            if (result.account.recordset.length === 0) {
                res.redirect('/')
            } else {
                registerData = result;
                res.render("business/detail/domain-names", {
                    businessactive,
                    registerData
                });
            }

        }).catch(err => {
            console.log(err)
            res.redirect('/')
        });
    }
}

exports.business_tradingnames_get = function (req, res) {
    currentURL = utils.getFullURL(req)
    var query = req.params.id;

    if (isNaN(query)) {
        res.redirect('/')
    } else {

        const accountData = require('../data/azuresql/getBusinessTradingNameData');
        let data = accountData(query);
        var registerData = "";

        data.then(result => {
            if (result.account.recordset.length === 0) {
                res.redirect('/')
            } else {
                registerData = result;
                res.render("business/detail/trading-names", {
                    businessactive,
                    registerData
                });
            }

        }).catch(err => {
            res.redirect('/')
        });
    }
}

exports.business_premises_get = function (req, res) {
    currentURL = utils.getFullURL(req)
    var query = req.params.id;

    if (isNaN(query)) {
        res.redirect('/')
    } else {

        const accountData = require('../data/azuresql/getBusinessPremisesData');
        let data = accountData(query);
        var registerData = "";

        data.then(result => {
            if (result.account.recordset.length === 0) {
                res.redirect('/')
            } else {
                registerData = result;
                res.render("business/detail/premises", {
                    businessactive,
                    registerData
                });
            }

        }).catch(err => {
            console.log(err)
            res.redirect('/')
        });
    }
}

exports.business_download_get = function (req, res) {
    res.render("business/download", {
        businessactive
    });
}

exports.business_full_get = function (req, res) {
    currentURL = utils.getFullURL(req)
    let query = req.session.data['business-search']

    const fullBusinessRegister = require('../data/azuresql/getFullBusinessRegister');
    let data = fullBusinessRegister();
    var registerData = "";

    data.then(result => {
        registerData = result;
        res.render("business/full", {
            businessactive,
            registerData
        });
    }).catch(err => {
        console.log(err);
    });

}