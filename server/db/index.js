const mysql=require('mysql');
const config=require('./config')

function connect() {
    return mysql.createConnection({
        host:config.host,
        user:config.user,
        password:config.password,
        database:config.database,
        multipleStatements:true
    })
}

function querySql(sql) {
    const connection=connect();
    return new Promise((resolve,reject)=>{
        try {
            connection.query(sql,(err,results)=>{
                if(err) reject(err)
                else {
                    resolve(results)
                }
            })
        }catch (e) {
            reject(e)
        }finally
        {
            connection.end()
        }
    })
}


module.exports={
    querySql
}