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

//获取用户信息

app.get('/userInfo',function(req,res){
    let userInfo = '';
    let adminInfo = '';
    let sql = 'select * from user';
    pool.query(sql,[],(err,results)=>{
        if(err){
            console.log(err);
            res.send({
                code: 0,
                status: 'error'
            })
        }else{
            userInfo = toDataArr(results);
            sql = 'select * from admins';
            pool.query(sql,[],(err,results)=>{
                if(err){
                    console.log(err)
                    res.send({
                        code: 0,
                        status: 'error'
                    })
                }else{
                    adminInfo = toDataArr(results);
                    res.send({
                        code: 1,
                        status: 'success',
                        users: userInfo,
                        admins: adminInfo
                    })
                }
            })
        }
    })
})

// 禁用用户

app.post('/ableUser',function(req,res){
    let id = '';
    let able = '';
    let sql = 'update user set access=? where userId=?';
    req.on('data',function(data){
        id = JSON.parse(data).userId;
        able = JSON.parse(data).able;
    })
    req.on('end',function(){
        pool.query(sql,[able,id],(err,results)=>{
            if(err){
                console.log(err);
                res.send({
                    code: 0,
                    status: 'error'
                })
            }else{
                res.send({
                    code: 1,
                    status: 'success'
                })
            }
        })
    })
})

// 添加管理员

app.post('/addAdmin',function(req,res){
    let adminData = '';
    let sql = 'insert into admins(username,password,name) values(?,?,?)'
    req.on('data',function(data){
        adminData = JSON.parse(data);
    })
    req.on('end',function(){
        pool.query(sql,[adminData.username,adminData.password,adminData.name],(err,results)=>{
            if(err){
                console.log(err);
                res.send({
                    code: 0,
                    status: 'error'
                })
            }else{
                res.send({
                    code: 1,
                    status: 'success'
                })
            }
        })
    })
})

// 获取问卷信息

app.get('/ProjInfo',function(req,res){
    let projInfo = [];
    let sql = 'select * from projects';
    pool.query(sql,[],(err,results)=>{
        if(err){
            console.log(err);
            res.send({
                code: 0,
                status: 'error'
            })
        }else{
            projInfo = toDataArr(results).reverse();
            res.send({
                code: 1,
                status: 'success',
                projInfo: projInfo
            })
        }
    })
})

// 获取选中问卷的问题列表

app.get('/getQuestions',function(req,res){
    let id = req.query.id;
    let sql = 'select * from questions where projectId=?';
    pool.query(sql,[id],(err,results)=>{
        if(err){
            console.log(err);
            res.send({
                code: 0,
                status: 'error'
            })
        }else{
            let result = toDataArr(results);
            for(let i=0;i<result.length;i++){
                if(result[i].type == 'radio' || result[i].type == 'checkbox'){
                    result[i].answers = JSON.parse(result[i].answers);
                }
            }
            res.send({
                code: '1',
                status: 'success',
                questions: result
            })
        }
    })
})

// 删除已发布的问卷
app.post('/deletePubProj',function(req,res){
    let delData = '';
    let sql = '';
    let result = '';
    req.on('data',function(data){
        delData = JSON.parse(data)
    })
    req.on('end',function(){
        // 删除projects表中信息
        sql = 'delete from projects where projectId=?';
        pool.query(sql,[delData.id],(err,results)=>{
            if(err){
                console.log(err);
                res.send({
                    code: 0,
                    status: 'error'
                })
            }else{
                // 删除questions表中问题信息
                sql = 'delete from questions where projectId=?';
                pool.query(sql,[delData.id],(err,results)=>{
                    if(err){
                        res.send({
                            code: 0,
                            status: 'error'
                        })
                    }else{
                        sql = 'delete from answer where projectName=? and author=?';
                        pool.query(sql,[delData.projectName,delData.username],(err,results)=>{
                            if(err){
                                res.send({
                                    code: 0,
                                    status: 'error'
                                })
                            }else{
                                res.send({
                                    code: 1,
                                    status: 'success'
                                })
                            }
                        })
                    }
                })
            }
        })
    })
})

// 获取答案信息

app.get('/getAnswer',function(req,res){
    let id = req.query.projectId;
    let sql = '';
    let questInfo = '';
    let answer = '';
    // 查询问题列表和问题类型和选项
    sql = 'select title,type,answers from questions where projectId=?'
    pool.query(sql,[id],(err,results)=>{
        if(err){
            console.log(err);
            res.send({
                code: 0,
                status: 'error'
            })
        }else{
            // 查询答案
            questInfo = toDataArr(results);
            // 查询id是否存在
            if(questInfo.length == 0){
                res.send({
                    code: 2,
                    status: 'empty'
                })
            }else{
                sql = 'select questTitle,answer,type from answer where projectId=?';
                pool.query(sql,[id],(err,results)=>{
                    if(err){
                        console.log(err);
                        res.send({
                            code: 0,
                            status: 'error'
                        })
                    }else{
                        answer = toDataArr(results);
                        for(let i=0;i<answer.length;i++){
                            answer[i].answer = JSON.parse(answer[i].answer);
                        }
                        for(let i=0;i<questInfo.length;i++){
                            questInfo[i].answers = JSON.parse(questInfo[i].answers);
                        }
                        // 统计选项的数量
                        async function Count(){
                            let result = [];
                            let count = [];
                            for(let i=0;i<questInfo.length;i++){{}
                                // 计算单选结果
                                if(questInfo[i].type == 'radio'){{}
                                    function calcCountRadio(){
                                        return new Promise(function(resolve,reject){
                                            let sql = 'select answer ,count(*) as count from answer where projectId=? and questTitle=? group by answer';
                                            pool.query(sql,[id,questInfo[i].title],(err,results)=>{
                                                if(err){
                                                    console.log(err)
                                                }else{
                                                    result.push(toDataArr(results));
                                                    resolve(result);
                                                }
                                            })
                                        })
                                    }
                                    count = await calcCountRadio();
                                    result = count;
                                }
                                // 计算多选结果
                                else if(questInfo[i].type == 'checkbox'){
                                    function calcCountCheckbox(){
                                        return new Promise(function(resolve,reject){
                                            let sql = 'select answer ,count(*) as count from answer where projectId=? and questTitle=? group by answer';
                                            pool.query(sql,[id,questInfo[i].title],(err,results)=>{
                                                if(err){
                                                    console.log(err)
                                                }else{
                                                    result.push(toDataArr(results));
                                                    resolve(result);
                                                }
                                            })
                                        })
                                    }
                                    count = await calcCountCheckbox();
                                    result = count;
                                }
                                // 查询文字题结果
                                else if(questInfo[i].type == 'text'){
                                    function calcText(){
                                        return new Promise(function(resolve,reject){
                                            let sql = 'select answer from answer where projectId=? and questTitle=?';
                                            pool.query(sql,[id,questInfo[i].title],(err,results)=>{
                                                result.push(toDataArr(results));
                                                resolve(result)
                                            })
                                        })
                                    }
                                    count = await calcText();
                                    result = count;
                                }
                            }
                            res.send({
                                code: 1,
                                status: 'success',
                                answer: result,
                                questInfo: questInfo
                            })
                        }
                        Count();
                    }
                })
            }
        }
    })
})

app.listen(4000);