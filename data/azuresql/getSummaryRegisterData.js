var config = require('./config');
const sql = require('mssql');
var cache = require('memory-cache');


async function getSummaryRegisterData(query) {

    if (cache.get('getSummaryRegisterData') !== null) {
        return cache.get('getSummaryRegisterData')

    } else {

        sql.close()
        let sqlResult = {};
        await sql.connect(config)

        let q = getData();

        sqlResult['summaryRegisterData'] = await q;        
        sqlResult['cachedTime'] = new Date();

        sql.close()

        cache.put('getSummaryRegisterData', sqlResult, process.env.cachelimit);
        return sqlResult;

    }
}

async function getData() {

    try {
        return await sql.query("SELECT * from view_PublicRegister_RegisterInfo");
    } catch (err) {
        console.log(err);
    }

}

module.exports = getSummaryRegisterData;