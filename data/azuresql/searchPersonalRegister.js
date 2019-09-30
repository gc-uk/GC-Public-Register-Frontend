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

    var nameArray = query.split(' ');

    if(nameArray.length === 1)
    {
        try {
            return await sql.query("EXEC SearchPersonalRegister @query = '" + query + "'");
        } catch (err) {
            console.log(err);
        }
    }
    else if(nameArray.length > 1){
        console.log(nameArray)
        try {
            return await sql.query("EXEC SearchPersonalRegister2 @query = '" + nameArray[0] + "', @query2 = '" + nameArray[1] + "'");
        } catch (err) {
            console.log(err);
        }
    }

 

}

module.exports = searchPersonalRegister;