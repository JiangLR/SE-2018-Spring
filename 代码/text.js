var mysql=require("mysql");
var express=require("express");
var app=express();
var events=require("events");
var eventemitter=new events.EventEmitter();
var bodyparser=require("body-parser");
var urlencode=bodyparser.urlencoded({extended:false});
app.use(express.static('public'));
app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({ extended: true }));
/*登录*/
function load_sql(res,id,pw){
    
    sql="select * from user where user_id=? and user_pw=?";
    sqlparams=[id,pw];
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
            
            res.sendFile(__dirname+"/public/homepage.html");
        }
        else{
            
            res.send("帐号或密码错误！");
        }   
    })
}
/*添加用户*/
function add_sql(id,pw,name,sex,birth,phone,email,sid,resume,res){
 
    addsql="insert into user values(?,?,?,?,?,?,?,0,?,?,null)";
    addsqlparams=[id,pw,name,sex,birth,phone,email,sid,resume];
    connection.query(addsql,addsqlparams,function(err,result){
        if(err){
            console.log(err.message);
            return;
        }
        else{
            res.send("注册成功");
        }
        
    })
    
}
/*注册帐号校验*/
function check_sql(res,id){
    
    sql="select * from user where user_id=?";
    sqlparams=[id];
    console.log("id:"+id);
    connection.query(sql,sqlparams,function(err,result){
        if(err){
            console.log(err.message);
            return;
        }
        console.log("成功进行sql");
        var str=false;
        for(var a in result){
            str=true;
        }
        if(str){
            console.log("帐号已被注册");
            res.write("帐号已被注册");
            res.end();
        }
        else{
            
            
            res.end();
        }
    })
}
/*关键词搜索*/
function keysearch(res,key){
    console.log(key);
    sql="select * from commodity where commodity_name like ? or commodity_key like ?";
    sqlparams=["%"+key+"%","%"+key+"%"];
    connection.query(sql,sqlparams,function(err,result){
        if(err){
            console.log(err.message);
            return;
        }
        else{
            console.log(JSON.stringify(result));
            res.end(JSON.stringify(result));
        }
    })
}
/*上架商品*/
function onsale(res,id,name,picture,price,intro,key){
   
    sql="insert into commodity values(?,?,?,?,?,?,?,0,0,null,0)";
    sqlparams=[id,name,picture,price,"123456",intro,key];
    connection.query(sql,sqlparams,function(err,result){
        if(err){
            console.log(err.message);
            return;
        }
        else{
            res.send("商品上架成功");
            
        }
    })
}
/*下架商品*/
function downsale(res,id){
    sql="delete from commodity where id=?";
    sqlparams=[id];
    connection.query(sql,sqlparams,function(err,result){
        if(err){
            console.log(err.message);
            return;
        }
        else{
            res.write("商品下架成功");
            res.end();
        }
    })
}
/*删除用户*/
function delete_sql(id,res){
  
    addsql="delete from user where user_id=?";
    addsqlparams=[id];
    connection.query(addsql,addsqlparams,function(err,result){
        if(err){
            console.log(err.message);
            return;
        }
        else{
            res.send("删除成功！");
        }
    })
    
}
app.get('/',function(req,res){
    res.sendFile(__dirname+"/public/load.html");
});

app.get('/load',function(req,res){
    res.sendFile(__dirname+"/public/index.html");
})
app.get('/post_data',function(req,res){
    res.sendFile(__dirname+"/public/add.html");
})
app.get('/delete_data',function(req,res){
    res.sendFile(__dirname+"/public/delete.html");
})
app.get('/homepage',function(req,res){
    res.sendFile(__dirname+"/public/homepage.html");
})
app.get('/onsale',function(req,res){
    res.sendFile(__dirname+"/public/onsale.html");
})
app.post('/load',urlencode,function(req,res){
    var response={
        "id":req.body.id,
        "ps":req.body.pw
    }
    load_sql(res,req.body.id,req.body.pw);
})
app.post("/post_data",urlencode,function(req,res){
    var response={
        "id":req.body.id,
        "pw":req.body.pw,
        "name":req.body.name,
        "sex":req.body.sex,
        "birth":req.body.birth,
        "phone":req.body.phone,
        "email":req.body.email,
        "sid":req.body.sid,
        "resume":req.body.resume
        

    };

    add_sql(req.body.id,req.body.pw,req.body.name,req.body.sex,req.body.birth,req.body.phone,req.body.email,req.body.sid,req.body.resume,res);
    console.log(response);
    
    
})
/*注册帐号校验*/
app.post('/add_check',function(req,res){
    console.log("post表单提交成功！");
    console.log(req.body.id);
    check_sql(res,req.body.id);
})
/*关键词搜索*/
app.post('/keysearch',urlencode,function(req,res){
    keysearch(res,req.body.key);
})
/*上架商品*/
app.post('/onsale',urlencode,function(req,res){
    onsale(res,req.body.id,req.body.name,req.body.picture,req.body.price,req.body.intro,req.body.key);
})
/*下架商品*/
app.post('/downsale',urlencode,function(req,res){
    downsale(res,req.body.id);
})
/*删除用户*/
app.post("/delete_data",urlencode,function(req,res){
    delete_sql(req.body.id);
})
/*数据库连接*/
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'zucc',
    port:'3306',
    database:'teamwork'
});
connection.connect();


/*连接服务器*/
var server=app.listen(3000,function(){
    var host=server.address().address;
    var port=server.address().port;
});
