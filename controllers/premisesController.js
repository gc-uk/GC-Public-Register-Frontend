var premisesactive = 'govuk-header__navigation-item--active';

exports.premises_home_get = function (req, res) {
    res.render("premises/index", {
        premisesactive
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