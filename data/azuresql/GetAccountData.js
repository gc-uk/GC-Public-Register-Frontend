var config = require('./config');
const sql = require('mssql');
var cache = require('memory-cache');


async function getBusinessData(query) {

    if (cache.get('getBusinessData-'+query) !== null) {
        console.log('From cache')
        return cache.get('getBusinessData-'+query)

    } else {
    sql.close()
    let sqlResult = {};
    await sql.connect(config)

    let a = getData(query);
    let b = getHeadOfficeAddresses(query);
    let c = getLicences(query);
    let d = getLicenceActivities(query);

    sqlResult['account'] = await a;
    sqlResult['hoAddress'] = await b;
    sqlResult['licences'] = await c;
    sqlResult['licenceActivities'] = await d;

    sql.close()
    cache.put('getBusinessData-'+query, sqlResult, 6000);
    return sqlResult;
    }
}

async function getData(query) {
    try {
        return await sql.query("EXEC GetAccountData @query = " + query);
    } catch (err) {
        console.log(err);
    }
}

async function getHeadOfficeAddresses(query) {
    try {
        return await sql.query("EXEC GetHeadOfficeAddressData @query = " + query);
    } catch (err) {
        console.log(err);
    }
}

async function getLicences(query) {
    try {
        return await sql.query("EXEC GetLicences @query = " + query);
    } catch (err) {
        console.log(err);
    }
}

async function getLicenceActivities(query) {
    try {
        return await sql.query("EXEC GetLicenceActivities @query = " + query);
    } catch (err) {
        console.log(err);
    }
}


module.exports = getBusinessData;