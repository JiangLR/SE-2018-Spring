

var mysql=require("mysql");
var express=require("express");
var app=express();
var events=require("events");
var eventemitter=new events.EventEmitter();
var bodyparser=require("body-parser");
var urlencode=bodyparser.urlencoded({extended:false});
//app.use(express.static('public'));
function load_sql(res,id,ps){
    sql="select * from websites where id=? and alexa=?";
    sqlparams=[id,ps];
    connection.query(sql,sqlparams,function(err,result){
        if(err){
            console.log(err.message);
            return;
        }
        var str=false;
        for(var a in result){
            
            str=true;
        }
        if(str){
            
            res.sendFile(__dirname+"/public/index.html");
        }
        else{
            
            res.send("帐号或密码错误！");
        }
        
        
        
    })
} 
app.get('/',function(req,res){
    res.sendFile(__dirname+"/public/load.html");
});
app.get('/index',function(req,res){
    res.sendFile(__dirname+"/public/index.html");
})
app.get('/load',function(req,res){
    res.sendFile(__dirname+"/public/load.html");
})
app.post('/load',urlencode,function(req,res){
    var response={
        "id":req.body.id,
        "ps":req.body.ps
    }
    load_sql(res,req.body.id,req.body.ps);
})
app.get('/post_data',function(req,res){
    res.sendFile(__dirname+"/public/add.html");
})
app.get('/delete_data',function(req,res){
    res.sendFile(__dirname+"/public/delete.html");
})
app.post("/post_data",urlencode,function(req,res){
    var response={
        "id":req.body.id,
        "name":req.body.name,
        "url":req.body.url,
        "alexa":req.body.alexa,
        "country":req.body.country

    };
    add_sql(req.body.id,req.body.name,req.body.url,req.body.alexa,req.body.country);
    console.log(response);
    res.send("添加成功！");
   // eventemitter.emit("R");
    
})
app.post("/delete_data",urlencode,function(req,res){
    var response={
        "id":req.body.id,
        

    };
    delete_sql(req.body.id);
    console.log(response);
    res.send("删除成功！");
    //eventemitter.emit("R");
})
var server=app.listen(3000,function(){
    var host=server.address().address;
    var port=server.address().port;
});
/*数据库连接*/
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'zucc',
    port:'3306',
    database:'websites'
});
connection.connect();
var addsql;
var addsqlparams;
/*增加数据*/
function add_sql(id,name,url,alexa,country){
    
    addsql="insert into websites values(?,?,?,?,?)";
    addsqlparams=[id,name,url,alexa,country];
    connection.query(addsql,addsqlparams,function(err,result){
        if(err){
            console.log(err.message);
            return;
        }
        
    })
    
}
/*删除数据*/
function delete_sql(id){
    
    addsql="delete from websites where id=?";
    addsqlparams=[id];
    connection.query(addsql,addsqlparams,function(err,result){
        if(err){
            console.log(err.message);
            return;
        }
        
    })
    
}
/*登录*/

//eventemitter.on("R",R_index);
/*返回主页
function R_index(){
   
    readFile(__dirname+"/public/index.html");
}*/