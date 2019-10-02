const express = require('express')
const router = express.Router();

var homeController = require('../controllers/homeController.js')
var businessController = require('../controllers/businessController.js')
var personalController = require('../controllers/personalController.js')
var premisesController = require('../controllers/premisesController.js')
var datasetsController = require('../controllers/datasetsController.js')

// TOP LEVEL
// Gets
router.get('/', homeController.home_get);
router.get('/accessibility', homeController.accessibility_get);
router.get('/feedback', homeController.feedback_get);
router.get('/help', homeController.help_get);
router.post('/feedback', homeController.feedback_post);
router.get('/feedback-thanks', homeController.feedback_thanks_get);
router.get('/performance', homeController.performance_get);
router.get('/redirect/activity-info/:id', homeController.redirectForActivity_get);
router.get('/dailyget', homeController.daily_get);


// BUSINESS
// Gets
router.get('/business/', businessController.business_home_get);
router.get('/business/detail/:id', businessController.business_details_get);
router.get('/business/download', businessController.business_download_get);
router.get('/business/results', businessController.business_results_get);
router.get('/business/full', businessController.business_full_get);
router.get('/business/detail/trading-names/:id', businessController.business_tradingnames_get);
router.get('/business/detail/domain-names/:id', businessController.business_domainnames_get);
router.get('/business/detail/premises/:id', businessController.business_premises_get);
router.get('/business/detail/settlements/:id', businessController.business_settlements_get);
router.get('/business/detail/sanctions/:id', businessController.business_sanctions_get);
// Posts
router.post('/business/search', businessController.business_search_post);

// PERSONAL
// Gets
router.get('/personal/', personalController.personal_home_get);
router.get('/personal/detail/:id', personalController.personal_details_get);
router.get('/personal/download', personalController.personal_download_get);
router.get('/personal/results', personalController.personal_results_get);
router.get('/personal/full', personalController.personal_full_get);
// Posts
router.post('/personal/search', personalController.personal_search_post);

// PREMISES
// Gets
router.get('/premises/', premisesController.premises_home_get);
router.get('/premises/detail/:id', premisesController.premises_details_get);
router.get('/premises/download', premisesController.premises_download_get);
router.get('/premises/results', premisesController.premises_results_get);
router.get('/premises/full', premisesController.premises_full_get);
// Posts
router.post('/premises/search', premisesController.premises_search_post);

// DATASETS
// Gets
router.get('/test-houses/', datasetsController.datasets_testhouse_get);
router.get('/drop-and-win/', datasetsController.datasets_dropandwin_get);
router.get('/regulatory-actions/', datasetsController.datasets_regulatoryactions_get);


module.exports = router