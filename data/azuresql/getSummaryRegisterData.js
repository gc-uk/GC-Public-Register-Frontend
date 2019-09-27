var config = require('./config');
const sql = require('mssql');


async function getSummaryRegisterData(query) {
    sql.close()
    let sqlResult = {};
    await sql.connect(config)

    let q = getData();

    sqlResult['summaryRegisterData'] = await q;

    sql.close()
    return sqlResult;
}

async function getData() {

    try {
        return await sql.query("SELECT * from view_PublicRegister_RegisterInfo");
    } catch (err) {
        console.log(err);
    }

}

module.exports = getSummaryRegisterData;