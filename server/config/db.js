// 创建数据库连接
const mysql = require("mysql")
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "sunyue1230",
    database: "sunyue"
})

connection.connect((err) => {
    if (err) { console.log("连接失败") }
    else { console.log("连接成功") }
})

exports.query = query