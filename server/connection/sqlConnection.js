const mysql = require('mysql');

const NODE_ENV = process.env.NODE_ENV;

if(NODE_ENV == 'production')
{

    global.con = mysql.createConnection({
        host : process.env.mysql_host,
        user : process.env.mysql_user,
        password : process.env.mysql_password,
        database : process.env.mysql_database
    
    });
}
else
{
    global.con = mysql.createConnection({
        host : process.env.mysql_host_local,
        user : process.env.mysql_user_local,
        password : process.env.mysql_password_local,
        database : process.env.mysql_database_local,
        socketPath: process.env.socketPath_local,
        port:process.env.mysql_port_local
    
    });
}



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