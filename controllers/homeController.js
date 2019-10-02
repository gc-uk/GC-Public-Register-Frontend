const utils = require('../utils.js');
var currentURL;

const Excel = require('exceljs/modern.nodejs');


exports.home_get = function (req, res) {
        currentURL = utils.getFullURL(req)
        const getSummaryRegisterData = require('../data/azuresql/getSummaryRegisterData');
        let summaryRegisterData = getSummaryRegisterData();
        var registerData = "";
        summaryRegisterData.then(result => {
                registerData = result.summaryRegisterData.recordset[0];
                var cachedTime = result.cachedTime
                res.render("index", {
                        currentURL,
                        registerData,
                        cachedTime
                });
        }).catch(err => {
                console.log(err);
        });

}

exports.accessibility_get = function (req, res) {
        res.render("accessibility");
}

exports.feedback_get = function (req, res) {
        res.render("feedback");
}

exports.help_get = function (req, res) {
        res.render("help");
}

exports.feedback_post = function (req, res) {

        if (req.session.data['telephone'] === "") {
                // Send feedback through Notify
                res.redirect("/feedback-thanks");
        } else {
                // No submission as a bot has completed the hidden field
                res.redirect("/feedback");
        }
}

exports.feedback_thanks_get = function (req, res) {

        res.render("feedback-thanks");
}

exports.performance_get = function (req, res) {
        res.render("performance");
}


exports.redirectForActivity_get = function (req, res) {

        // Get the id
        var activity = req.params.id;

        // Get the config
        const d = require('../data/activity.json');

        var record = d.activities.filter(function (value) {
                return value.activity === activity;
        });

        var url = record[0].url;

        res.render("redirect/activity-info", {
                url
        })
}

exports.daily_get = function (req, res) {

        const fullPremisesRegisterData = require('../data/azuresql/getFullPremisesRegister');
        let premises = fullPremisesRegisterData();

        const fullPersonalRegister = require('../data/azuresql/getFullPersonalRegister');
        let personal = fullPersonalRegister();


        const allTradingAndDomainNames = require('../data/azuresql/getAllTradingAndDomainNames');
        let allNames = allTradingAndDomainNames();



        // Create the business register dataset

        var businessRegisterData = "";
        var allNameData = "";

        console.log('start')

        var businessExcel = new Excel.Workbook();

        businessExcel.creator = 'Gambling Commission Digital Team';
        businessExcel.lastModifiedBy = 'Gambling Commission Digital Team';
        businessExcel.created = new Date();
        businessExcel.modified = new Date();

        var sheet1 = businessExcel.addWorksheet('Businesses');
        var sheet2 = businessExcel.addWorksheet('TradingNames');
        var sheet3 = businessExcel.addWorksheet('DomainNames');

        var reColumns = [{
                header: 'Account Number',
                key: 'AccountNumber'
        }, {
                header: 'Account Name',
                key: 'AccountName'
        }, {
                header: 'Account Type',
                key: 'AccountType'
        }, {
                header: 'Account Start',
                key: 'AccountStart'
        }, {
                header: 'Trading Name Count',
                key: 'TradingNameCount'
        }, {
                header: 'Domain Name Count',
                key: 'DomainNameCount'
        }, {
                header: 'Premises Count',
                key: 'CountOfPremises'
        }];
        sheet1.columns = reColumns;

        var tnColumns = [{
                header: 'Account Number',
                key: 'AccountNumber'
        }, {
                header: 'Trading Name',
                key: 'TradingName'
        }, {
                header: 'Status',
                key: 'Status'
        }];
        sheet2.columns = tnColumns;

        var dnColumns = [{
                header: 'Account Number',
                key: 'AccountNumber'
        }, {
                header: 'Domain Name',
                key: 'DomainName'
        }, {
                header: 'Status',
                key: 'Status'
        }];
        sheet3.columns = dnColumns;

        allNames.then(tresult => {
                allNameData = tresult;

                console.log('populate business name sheet')

                allNameData.accounts.recordset.forEach(function (data) {
                        sheet1.addRow(data);
                })


                console.log('populate trading name sheet')

                allNameData.tradingNames.recordset.forEach(function (data) {
                        sheet2.addRow(data);
                })

                console.log('populate trading name sheet')

                allNameData.domainNames.recordset.forEach(function (data) {
                        sheet3.addRow(data);
                })


           

                businessExcel.xlsx.writeFile("../public/business-licence-register.xlsx").then(function () {
                        console.log('business register generated')
                }).catch(err => {
                        console.log(err);
                });

        }).catch(err => {
                console.log(err);
        });





        // Create the personal register dataset

        var personalRegisterData = "";

        personal.then(result => {
                personalRegisterData = result;
                var personalExcel = new Excel.Workbook();

                personalExcel.creator = 'Gambling Commission Digital Team';
                personalExcel.lastModifiedBy = 'Gambling Commission Digital Team';
                personalExcel.created = new Date();
                personalExcel.modified = new Date();
                var sheet1 = personalExcel.addWorksheet('Personal');
                var reColumns = [{
                                header: 'AccountNumber',
                                key: 'accountnumber'
                        },
                        {
                                header: 'IndividualFirstName',
                                key: 'IndividualFirstName'
                        },
                        {
                                header: 'IndividualLastName',
                                key: 'IndividualLastName'
                        },
                        {
                                header: 'City',
                                key: 'City'
                        },
                        {
                                header: 'Licence number',
                                key: 'licencenumber'
                        },
                        {
                                header: 'Licence type',
                                key: 'Type'
                        },
                        {
                                header: 'Licence status',
                                key: 'Status'
                        },
                        {
                                header: 'Licence start date',
                                key: 'start'
                        },
                        {
                                header: 'Next renewal date',
                                key: 'nextrenewaldate'
                        }
                ];
                sheet1.columns = reColumns;
                console.log(personalRegisterData.accounts.recordset)

                personalRegisterData.accounts.recordset.forEach(function (data) {
                        sheet1.addRow(data);
                })

                personalExcel.xlsx.writeFile("../public/personal-licence-register.xlsx").then(function () {
                        console.log('personal register generated')
                });

        }).catch(err => {
                console.log(err);
        });




        // Create the premises register dataset

        var premisesRegisterData = "";

        premises.then(result => {
                premisesRegisterData = result;
                var premisesExcel = new Excel.Workbook();

                premisesExcel.creator = 'Gambling Commission Digital Team';
                premisesExcel.lastModifiedBy = 'Gambling Commission Digital Team';
                premisesExcel.created = new Date();
                premisesExcel.modified = new Date();
                var sheet1 = premisesExcel.addWorksheet('Premises');
                var reColumns = [{
                                header: 'RowID',
                                key: 'rowid'
                        },
                        {
                                header: 'AccountNumber',
                                key: 'accountnumber'
                        },
                        {
                                header: 'Account Name',
                                key: 'accountname'
                        },
                        {
                                header: 'Premises Activity',
                                key: 'premisesactivity'
                        },
                        {
                                header: 'Local Authority',
                                key: 'localauthority'
                        },
                        {
                                header: 'AddressLine1',
                                key: 'addressline1'
                        },
                        {
                                header: 'AddressLine2',
                                key: 'addressline2'
                        },
                        {
                                header: 'City',
                                key: 'city'
                        },
                        {
                                header: 'Postcode',
                                key: 'postcode'
                        }
                ];
                sheet1.columns = reColumns;

                premisesRegisterData.Premises.recordset.forEach(function (data) {
                        sheet1.addRow(data);
                })

                premisesExcel.xlsx.writeFile("../public/gambling-premises-register.xlsx").then(function () {
                        console.log('premises register generated')
                });


        }).catch(err => {
                console.log(err);
        });


        res.render("index");
}