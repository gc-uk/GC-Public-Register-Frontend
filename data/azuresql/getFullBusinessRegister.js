var config = require('./config');
const sql = require('mssql');


async function getFullBusinessRegister() {
    sql.close()
    
    let sqlResult = {};
    await sql.connect(config)

    let a = getData();

    sqlResult['accounts'] = await a;

    sql.close()
    return sqlResult;
}

async function getData() {
    try {
        return await sql.query("EXEC GetFullBusinessRegister");
    } catch (err) {
        console.log(err);
    }

}



module.exports = getFullBusinessRegister;