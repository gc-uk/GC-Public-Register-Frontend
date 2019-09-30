var config = require('./config');
const sql = require('mssql');


async function searchBusinessRegister(query, filter) {
    sql.close()
    
    let sqlResult = {};
    await sql.connect(config)

    console.log(filter)

    let a = getData(query, filter);
    let b = getDomainNames(query);
    let c = getTradingNames(query);

    sqlResult['accounts'] = await a;
    sqlResult['domainnames'] = await b;
    sqlResult['tradingnames'] = await c;

    sql.close()
    return sqlResult;
}

async function getData(query, filter) {
    var strippedQuery = query.replace(/\s/g, '');
    try {        
        return await sql.query("EXEC SearchBusinessRegister @query = '" + query + "', @strippedquery = '" + strippedQuery + "'");
    } catch (err) {
        console.log(err);
    }

}


async function getDomainNames(query) {

    try {
        var strippedQuery = query.replace(/\s/g, '');
        return await sql.query("EXEC SearchDomainNames @query = '" + query + "', @strippedquery = '" + strippedQuery + "'");
    } catch (err) {
        console.log(err);
    }

}

async function getTradingNames(query) {

    try {
        var strippedQuery = query.replace(/\s/g, '');
        return await sql.query("EXEC SearchTradingNames @query = '" + query + "', @strippedquery = '" + strippedQuery + "'");
    } catch (err) {
        console.log(err);
    }

}

module.exports = searchBusinessRegister;