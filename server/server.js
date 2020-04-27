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

toDataArr = function(data){
    let String = JSON.stringify(data);
    String = JSON.parse(String);
    return String;
}

// 登录验证

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

// 主页获取信息
app.get('/systemInfo',function(req,res){
    let usersCount = 0,
        projectsCount = 0;
    let sql = 'select username from user';
    pool.query(sql,[],(err,results)=>{
        if(err){
            console.log(err);
            res.send({
                code: 0,
                status: 'error'
            })
        }else{
            let result = toDataArr(results);
            usersCount = result.length;
            sql = 'select projectId from projects'
            pool.query(sql,[],(err,results)=>{
                if(err){
                    console.log(err);
                    res.send({
                        code: 0,
                        status: 'error'
                    })
                }else{
                    result = toDataArr(results);
                    projectsCount = result.length;
                    res.send({
                        code: 1,
                        status: 'success',
                        users: usersCount,
                        projects: projectsCount
                    })
                }
            })
        }
    })
})

app.listen(4000);