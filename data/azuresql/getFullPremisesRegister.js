var config = require('./config');
const sql = require('mssql');


async function getFullPremisesRegister() {
    sql.close()
    
    let sqlResult = {};
    await sql.connect(config)

    let a = getData();

    sqlResult['Premises'] = await a;

    sql.close()
    return sqlResult;
}

async function getData() {
    try {
        return await sql.query("EXEC GetFullPremisesRegister");
    } catch (err) {
        console.log(err);
    }

}


module.exports = getFullPremisesRegister;