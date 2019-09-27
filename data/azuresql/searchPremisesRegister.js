var config = require('./config');
const sql = require('mssql');


async function searchPremisesRegister(query) {
    sql.close()
    
    let sqlResult = {};
    await sql.connect(config)

    let a = getData(query);

    sqlResult['Premises'] = await a;

    sql.close()
    return sqlResult;
}

async function getData(query) {
    var strippedQuery = query.replace(/\s/g, '');
    try {
        return await sql.query("EXEC SearchPremisesRegister @query = '" + query + "', @strippedquery = '" + strippedQuery + "'");
    } catch (err) {
        console.log(err);
    }

}


module.exports = searchPremisesRegister;