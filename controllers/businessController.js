var businessactive = 'govuk-header__navigation-item--active';


exports.business_home_get = function (req, res) {
    res.render("business/index", {
        businessactive
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
    res.render("business/results", {
        businessactive
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