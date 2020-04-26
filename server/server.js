const mysql = require('mysql'),
    express = require('express'),
    request = require('request'),
    qs = require('querystring'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    app = express();

app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With');
    res.header('Access-control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By','3.2.1');
    res.header('Content-Type','application/json;charset=urf-8');
    next();
});
    
// 创建连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'cymcymcym',
    database: 'aqsystem',
    dateStrings: true
});

console.log('已连接');

// 封装一个解析返回数据函数，返回值是一个数组
toDataArr = function(data){
    let String = JSON.stringify(data);
    String = JSON.parse(String);
    return String;
}

app.post('/login',function(req,res){
    let loginData = '';
    req.on('data',function(data){
        loginData = JSON.parse(data)
    })
    req.on('end',function(){
        let sql = 'select password from admins where username=?';
        pool.query(sql,[loginData.username],(err,results)=>{
            if(err){
                console.log(err);
                res.send({
                    code: 0,
                    status: 'error'
                })
            }else{
                let result = toDataArr(results);
                if(result[0].password == loginData.password){
                    res.send({
                        code: 1,
                        status: 'success'
                    })
                }else{
                    res.send({
                        code: 2,
                        status: 'error'
                    })
                }
            }
        })
    })
})

app.listen(4000);