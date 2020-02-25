const mysql = require("mysql")
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "sunyue1230",
    database: "positionSystem"
})
connection.connect((err) => {
    if (err) { console.log("连接失败") }
    else { console.log("连接成功") }
})

let query=(sql, callback)=>{
    connection.query(sql, function (err, rows) {
        callback(err, rows);
    });
    // connection.end();//end()的话好像就只能连接一次的样子
}

exports.query = query