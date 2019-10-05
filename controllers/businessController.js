const utils = require('../utils.js');
var businessactive = 'govuk-header__navigation-item--active';
var url = require('url');


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
    const externalLinks = require('../data/activity.json');

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
                    registerData,
                    externalLinks
                });
            }

        }).catch(err => {
            console.log(err)
            res.redirect('/')
        });
    }

}

exports.business_download_get = function (req, res) {
    var fs = require("fs"); //Load the filesystem module
    var stats = fs.statSync("./public/business-licence-register.xlsx")
    var fileSizeInBytes = stats["size"]
    var ctime = stats["ctime"];

    var divideForKbOrMb = 1000;
    var mborkb = "kb";

    if (fileSizeInBytes > 1000000) {
        divideForKbOrMb = 1000000;
        mborkb = "mb";
    }

    var fileSizeInMegabytes = Math.round(fileSizeInBytes / divideForKbOrMb)

    res.render("business/download", {
        businessactive,
        fileSizeInMegabytes,
        ctime,
        mborkb
    });
}

exports.business_search_post = function (req, res) {
    res.redirect("/business/results");
}

exports.business_results_get = function (req, res) {

    // Do the search and display the results to the user

    currentURL = utils.getFullURL(req)
    let query = req.session.data['business-search']
    let filter = req.session.data['sector']

    console.log(query);

    if (filter !== undefined && !Array.isArray(filter)) {
        filter = Array.of(filter)
    }

    console.log(filter);

    if (query === '' && filter === undefined) {

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

    } else {

        const searchBusinessRegister = require('../data/azuresql/searchBusinessRegister');
        let data = searchBusinessRegister(query, filter);
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
    var fs = require("fs"); //Load the filesystem module
    var stats = fs.statSync("./public/business-licence-register.xlsx")
    var fileSizeInBytes = stats["size"]
    var ctime = stats["ctime"];

    var divideForKbOrMb = 1000;
    var mborkb = "kb";

    if (fileSizeInBytes > 1000000) {
        divideForKbOrMb = 1000000;
        mborkb = "mb";
    }

    var fileSizeInMegabytes = Math.round(fileSizeInBytes / divideForKbOrMb)

    res.render("business/download", {
        businessactive,
        fileSizeInMegabytes,
        ctime,
        mborkb
    });
}

exports.business_filter_post = function (req, res) {

    console.log("Post filter start")

    if(req.body.sector === null || req.body.sector === undefined || req.body.sector.length === 0){
        req.session.data['sector'] = undefined;
    }
    console.log(req.body.sector)
    console.log(req.session.data['sector'])
    console.log("Post filter end")
    res.redirect('/business/full/1')

}


exports.business_full_get = function (req, res) {

    // I realise these could be improved massivley, however, it'll help those unfamiliar with code understand the logic

    var pageRequested = 1; // Set a default for the first page
    var hasSessionFilters = false;

    if (req.session.data['sector'] !== undefined) {
        hasSessionFilters = true;
    }

    if (!isNaN(req.params.page)) {
        pageRequested = Number.parseInt(req.params.page);
    }





    // Defaults
    var filtersArray = []; // Empty array to hold the filter options
    var hasFilters = false; // A flag to use later on if there are filters or not. It'll make it easier than checking the length of the filters array

    console.log("START")
    console.log(req.session.data['sector'])

    if (req.session.data['sector'] !== undefined) {
        // There are some sectors

        if (!Array.isArray(req.session.data['sector'])) {
            filtersArray.push(req.session.data['sector']);
            hasFilters = true;
        }


        if (Array.isArray(req.session.data['sector'])) {
            filtersArray = req.session.data['sector'];
            hasFilters = true;
        }

    }


    // Sanity check of the filters and has filters
    console.log("Has filters: " + hasFilters)
    console.log("Filters: " + filtersArray)
    console.log("Page: " + pageRequested)

    // Set some defaults for the data

    var offset = 0; // default, start with the first record in the dataset
    var limit = 50; // default, get 50 records max per request
    var total = 0; // default, how many records are in the dataset
    var pages = 0; // default, will store how many pages of records there are
    var nextPage = 0; // default, will be the number of the next page in the list of pages  
    var prevPage = 0; // default, will be the number of the previous page in the list of pages
    var order = "a"; // default the page order to ascending

    // Lets get some data

    // What is the offset that we need to get?
    // If page 1, then we need it to be 0 as the sql dataset needs to be from the first record (index 0)
    // This is already set by default

    // Anything else, needs to be a multiple of 50, as the list being returned is 50 but also start at 0 for page 1       
    // 1 = 0
    // 2 = 50
    // 3 = 100
    // 4 = 150

    offset = ((50 * pageRequested) - 50) // eg: ((50 * 4) = 200) - 50 = 150) (0, 50, 100, 150)

    const fullBusinessRegister = require('../data/azuresql/getFullBusinessRegister');
    let data = fullBusinessRegister(offset, limit, "a", hasFilters, filtersArray);

    data.then(registerData => {
        // registerData is a set of recordsets of data based on the query in to fullBuinsessRegister. 

        // Whats the total number of records for the given query?   
        // accounts recordset contains all the records for the given query.


        total = registerData.total.recordset[0].count;

        // How many pages are there? Round up so we don't have pages missing
        // Pages is the total from above divided by the limit per page (50)
        pages = Math.round(total / limit);

        // set some variables for the next and previous pages to make it easier for the frontend
        nextPage = pageRequested + 1;
        prevPage = pageRequested - 1;

        
    console.log("next Page: " + nextPage)
    
    console.log("prev page: " + prevPage)

        // If the pages are higher or lower than the number of pages, 0 them and the frontend wont show them

        if (nextPage > pages) {
            nextPage = 0
        }

        if (prevPage < 0) {
            prevPage = 0
        }

        
    console.log("next Page: " + nextPage)
    
    console.log("prev page: " + prevPage)

        // Got everything we need, set up the session and send to the page
        console.log("END")
        res.render("business/full", {
            businessactive,
            registerData,
            offset,
            limit,
            pages,
            nextPage,
            prevPage,
            pageRequested,
            order,
            total
        });


    }).catch(err => {
        console.log(err);
    });
}

exports.business_settlements_get = function (req, res) {

    currentURL = utils.getFullURL(req)
    var query = req.params.id;

    if (isNaN(query)) {
        res.redirect('/')
    } else {

        const accountData = require('../data/azuresql/getBusinessActions');
        let data = accountData(query);
        var registerData = "";

        data.then(result => {
            if (result.account.recordset.length === 0) {
                res.redirect('/')
            } else {
                registerData = result;
                res.render("business/detail/settlements", {
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

exports.business_sanctions_get = function (req, res) {

    currentURL = utils.getFullURL(req)
    var query = req.params.id;

    if (isNaN(query)) {
        res.redirect('/')
    } else {

        const accountData = require('../data/azuresql/getBusinessSanctions');
        let data = accountData(query);
        var registerData = "";

        data.then(result => {
            if (result.account.recordset.length === 0) {
                res.redirect('/')
            } else {
                registerData = result;
                res.render("business/detail/sanctions", {
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