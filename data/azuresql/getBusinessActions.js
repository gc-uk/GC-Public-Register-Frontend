var config = require('./config');
const sql = require('mssql');


async function getBusinessActions(query) {
    sql.close()
    let sqlResult = {};
    await sql.connect(config)

    let a = getData(query);
    let b = getHeadOfficeAddresses(query);
    let c = getActions(query);

    sqlResult['account'] = await a;
    sqlResult['hoAddress'] = await b;
    sqlResult['actions'] = await c;

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

async function getHeadOfficeAddresses(query) {
    try {
        return await sql.query("EXEC GetHeadOfficeAddressData @query = " + query);
    } catch (err) {
        console.log(err);
    }
}

async function getActions(query) {
    try {
        return await sql.query("EXEC GetRegulatoryActions @query = " + query);
    } catch (err) {
        console.log(err);
    }
}


module.exports = getBusinessActions;