var config = require('./config');
const sql = require('mssql');


async function getPremisesData(query) {
    sql.close()
    
    let sqlResult = {};
    await sql.connect(config)

    let a = getData(query);

    sqlResult['Premises'] = await a;

    sql.close()
    return sqlResult;
}

async function getData(query) {
    try {
        return await sql.query("EXEC GetPremisesData @query = " + query);
    } catch (err) {
        console.log(err);
    }

}



module.exports = getPremisesData;