var config = require('./config');
const sql = require('mssql');
var cache = require('memory-cache');


async function getFullBusinessRegister() {

    if (cache.get('getFullBusinessRegister') !== null) {
        console.log('From cache')
        return cache.get('getFullBusinessRegister')

    } else {
    sql.close()

    
    console.log('From database')
    
    let sqlResult = {};
    await sql.connect(config);

    let a = getData();

    sqlResult['accounts'] = await a;

    sql.close();

    cache.put('getFullBusinessRegister', sqlResult, process.env.cachelimit);
    return sqlResult;
    }

}

async function getData() {
    try {
        return await sql.query("EXEC GetFullBusinessRegister");
    } catch (err) {
        console.log(err);
    }

}



module.exports = getFullBusinessRegister;