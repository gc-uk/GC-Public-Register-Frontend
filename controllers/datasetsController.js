var datasetsactive = 'govuk-header__navigation-item--active';

exports.datasets_testhouse_get = function (req, res) {
    res.render("test-houses/index", {
        datasetsactive
    });
}

exports.datasets_dropandwin_get = function (req, res) {
    res.render("drop-and-win/index", {
        datasetsactive
    });
}

exports.datasets_regulatoryactions_get = function (req, res) {
    res.render("regulatory-actions/index", {
        datasetsactive
    });
}