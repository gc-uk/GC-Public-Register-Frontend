var config = require('./config');
const sql = require('mssql');


async function searchPersonalRegister(query) {
    sql.close()
    
    let sqlResult = {};
    await sql.connect(config)

    let a = getData(query);

    sqlResult['accounts'] = await a;

    sql.close()
    return sqlResult;
}

async function getData(query) {
    try {
        return await sql.query("EXEC SearchPersonalRegister @query = '" + query + "'");
    } catch (err) {
        console.log(err);
    }

}

module.exports = searchPersonalRegister;