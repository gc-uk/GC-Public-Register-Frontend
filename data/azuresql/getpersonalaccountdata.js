var config = require('./config');
const sql = require('mssql');


async function getPersonalAccountData(query) {
    sql.close()
    let sqlResult = {};
    await sql.connect(config)

    let a = getData(query);
    let b = getHomeAddresses(query);
    let c = getLicences(query);
    let d = getLicenceActivities(query);

    sqlResult['account'] = await a;
    sqlResult['homeAddress'] = await b;
    sqlResult['licences'] = await c;
    sqlResult['licenceActivities'] = await d;

    sql.close()
    return sqlResult;
}

async function getData(query) {
    try {
        return await sql.query("EXEC GetAccountData @query = " + query);
    } catch (err) {
        console.log(err);
    }
}

async function getHomeAddresses(query) {
    try {
        return await sql.query("EXEC GetHomeAddressData @query = " + query);
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


module.exports = getPersonalAccountData;