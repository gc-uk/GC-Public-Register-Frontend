var config = require('./config');
const sql = require('mssql');
var cache = require('memory-cache');

async function getFullBusinessRegister(offset, fetch, order, hasFilters, filter) {

    sql.close();
    let sqlResult = {};
    await sql.connect(config);

    let a = getData(offset, fetch, order, hasFilters, filter);
    let b = getTotal(hasFilters,filter);

    sqlResult['accounts'] = await a;
    sqlResult['total'] = await b;

    sql.close();

    return sqlResult;
}

async function getTotal(hasFilters,filter) {
    if (hasFilters === true) {
        try {
            return await sql.query("EXEC GetCountFullBusinessRegister @filter = '" + filter + "'");
        } catch (err) {
            console.log(err);
        }
    } else {
        try {
            return await sql.query("EXEC GetCountFullBusinessRegisterNoPage");
        } catch (err) {
            console.log(err);
        }
    }
}

async function getData(offset, fetch, order, hasFilters, filter) {

    console.log("offset: "+ offset)
    console.log("fetch: " + fetch)
    console.log("order: "+ order)
    console.log("order: "+ hasFilters)
    console.log("filter: "+ filter)

    if (hasFilters === true) {

        // filter query
        console.log('filter query')
        try {
            return await sql.query("EXEC GetFullBusinessRegister @offset =" + offset + ", @fetch = " + fetch + ", @order = " + order + ", @hasFilters = '" + hasFilters + "', @filter = '" + filter + "'");
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log('non filter query')
        try {
            return await sql.query("EXEC GetFullBusinessRegisterNoFilter @offset =" + offset + ", @fetch = " + fetch);
        } catch (err) {
            console.log(err);
        }
    }




}

module.exports = getFullBusinessRegister;