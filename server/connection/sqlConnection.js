const mysql = require('mysql');

global.con = mysql.createConnection({
    host : 'localhost',
    user : 'nb53dc5_user',
    password : '$0SW5hvtRo}.',
    database : 'nb53dc5_paid2park'

});


let connection = async function () {
    try {
        await con.connect();
        console.log("Connected to SQL");

    } catch (error) {
        console.log("Error in connecting to database");
        return error;
    }

}
module.exports = connection;