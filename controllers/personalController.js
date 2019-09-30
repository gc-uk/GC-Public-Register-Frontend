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
    currentURL = utils.getFullURL(req)
    var query = req.params.id;

    const externalLinks = require('../data/activity.json');

    if (isNaN(query)) {
        res.redirect('/')
    } else {

        const accountData = require('../data/azuresql/getpersonalaccountdata');
        let data = accountData(query);
        var registerData = "";

        data.then(result => {
            if (result.account.recordset.length === 0) {
                res.redirect('/')
            } else {
                registerData = result;
                res.render("personal/detail/index", {
                    personalactive,
                    registerData,
                    externalLinks
                });
            }

        }).catch(err => {
            res.redirect('/')
        });
    }
}

exports.personal_download_get = function (req, res) {

    var fs = require("fs"); //Load the filesystem module
    var stats = fs.statSync("./public/personal-licence-register.xlsx")
    var fileSizeInBytes = stats["size"]
    var ctime = stats["ctime"];

    var divideForKbOrMb = 1000;
    var mborkb = "kb";

    if (fileSizeInBytes > 1000000) {
        divideForKbOrMb = 1000000;
        mborkb = "mb";
    }

    var fileSizeInMegabytes = Math.round(fileSizeInBytes / divideForKbOrMb)

    res.render("personal/download", {
        personalactive,
        fileSizeInMegabytes,
        ctime,
        mborkb
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