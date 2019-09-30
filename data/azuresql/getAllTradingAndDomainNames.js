var config = require('./config');
const sql = require('mssql');


async function getAllTradingAndDomainNames() {
    sql.close()
    let sqlResult = {};
    await sql.connect(config)

    let a = getData();
    let b = getDNData();
    let c = getaData();

    sqlResult['tradingNames'] = await a;
    sqlResult['domainNames'] = await b;    
    sqlResult['accounts'] = await c;

    sql.close()
    return sqlResult;
}

async function getData() {
    try {
        return await sql.query("EXEC GetAllTradingNames");
    } catch (err) {
        console.log(err);
    }
}

async function getDNData() {
    try {
        return await sql.query("EXEC GetAllDomainNames");
    } catch (err) {
        console.log(err);
    }
}

async function getaData() {
    try {
        return await sql.query("EXEC GetFullBusinessRegister");
    } catch (err) {
        console.log(err);
    }

}


module.exports = getAllTradingAndDomainNames;