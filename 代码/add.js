var xt1=1;
var xt2=1;
var xt3=1;
var xt4=1;
var xt5=1;
var xt6=1;
var xt7=1;
function submittest() {
    var a = document.getElementById("id").value;
    var b = document.getElementById("name").value;
    var c = document.getElementById("url").value;
    var d = document.getElementById("alexa").value;
    var e = document.getElementById("country").value;
    

   if(xt1==1&&xt2==1&&xt3==1&&xt4==1&&xt5==1&&xt6==1&&xt7==1){
       return true;
   } 
   else{
       return false;
   }
   if(!a){
        document.getElementById("remind1").innerHTML="请输入id!";
        return false;
    }
    if(!b){
        document.getElementById("remind2").innerHTML="请输入name!";
        return false;
    }
    if(!c){
        document.getElementById("remind3").innerHTML="请输入url!";
        return false;
    }
    if(!d){
        document.getElementById("remind4").innerHTML="请输入alexa!";
        return false;
    }
    if(!e){
        document.getElementById("remind5").innerHTML="请输入country!";
        return false;
    }
    
}
function showhint(str){
    
    var xmlhttp;
    var form={"id":str};
    var pattern=/^\w{6,12}$/;
    if(pattern.test(str)==true){
        document.getElementById("remind1").innerHTML="";
        xt1=1;
        
    }
    else{
        xt1=0;
        document.getElementById("remind1").innerHTML="帐号格式错误！";
        return;
    }
    if(window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {   
        
       // document.getElementById("remind3").innerHTML=("readyState:"+xmlhttp.readyState+"  status:"+xmlhttp.status);
        if(xmlhttp.readyState==4&& xmlhttp.status==200){
           
            document.getElementById("remind1").innerHTML=xmlhttp.responseText;
            if(document.getElementById("remind1").innerHTML==""){
                xt=1;
            }
            else{
                xt=0;
            }
            
        }
    }
    xmlhttp.open("POST", "http://127.0.0.1:3000/add_check", true);
    xmlhttp.setRequestHeader("Content-type","application/json");//需要设置成application/json
    xmlhttp.send(JSON.stringify(form)); //body-parser解析的是字符串，所以需要把json对象转换成字符串

}
function check1(str){
    var pattern=/^\w{6,12}$/;
    if(pattern.test(str)==true){
        document.getElementById("remind2").innerHTML="";
        xt2=1;
        xt3=0;
    }
    else{
        xt2=0;
        document.getElementById("remind2").innerHTML="密码格式错误！";
        return;
    }
    var str1=document.getElementById("pw1").value;
    check2(str1);
   
}
function check2(str){
    if(str==document.getElementById("pw").value){
        document.getElementById("remind3").innerHTML="";
        xt3=1;
    }
    else{
        document.getElementById("remind3").innerHTML="密码不一致！";
        xt3=0;
    }
}
function check3(str){
    var pattern=/^[0-9]{8}$/;
    if(pattern.test(str)==true){
        var a=parseInt(str.substring(0,4));
        var b=parseInt(str.substring(4,6));
        var c=parseInt(str.substring(6,8));
        var d=1;
        if(a%4==0){
            d=1;
        }
        else
            d=0;
        if(b==1||b==3||b==5||b==7||b==8||b==10||b==12){
            if(c<=31){
                document.getElementById("remind6").innerHTML="";
                xt4=1;
                return;
            }
            else{
                xt4=0;
                document.getElementById("remind6").innerHTML="生日格式错误！生日格式：19970824（8位纯数字）";
                return;
            }
        }
        else if(b==2){
            if(d==1){
                if(c<=29){
                    document.getElementById("remind6").innerHTML="";
                    xt4=1;
                    return;
                }
                else{
                    xt4=0;
                    document.getElementById("remind6").innerHTML="生日格式错误！生日格式：19970824（8位纯数字）";
                    return;
                }
            }
            else{
                if(c<=28){
                    document.getElementById("remind6").innerHTML="";
                    xt4=1;
                    return;
                }
                else{
                    xt4=0;
                    document.getElementById("remind6").innerHTML="生日格式错误！生日格式：19970824（8位纯数字）";
                    return;
                }
            }
        }
        else if(b==4||b==6||b==9||b==11){
            if(c<=30){
                document.getElementById("remind6").innerHTML="";
                xt4=1;
                return;
            }
            else{
                xt4=0;
                document.getElementById("remind6").innerHTML="生日格式错误！生日格式：19970824（8位纯数字）";
                return;
            }
        }
        else{
            xt4=0;
            document.getElementById("remind6").innerHTML="生日格式错误！生日格式：19970824（8位纯数字）";
            return;
        }


       
        
    }
    else{

        xt4=0;
        document.getElementById("remind6").innerHTML="生日格式错误！生日格式：19970824（8位纯数字）";
        return;
    }

}
function check4(str){
    var pattern=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    if(pattern.test(str)==true){
        document.getElementById("remind7").innerHTML="";
        xt5=1;
        
    }
    else{
        xt5=0;
        document.getElementById("remind7").innerHTML="手机号格式错误！";
        
    }
}
function check5(str){
    var pattern=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(pattern.test(str)==true){
        document.getElementById("remind8").innerHTML="";
        xt6=1;
        
    }
    else{
        xt6=0;
        document.getElementById("remind8").innerHTML="邮箱格式错误！";
        
    }
}
function check6(str){
    var pattern=/^\w{8}$/;
    if(str.length==0){
        xt7=1;
        return;
    }
    if(pattern.test(str)==true){
        document.getElementById("remind9").innerHTML="";
        xt7=1;
        
    }
    else{
        xt7=0;
        document.getElementById("remind9").innerHTML="学号格式错误！";
        
    }
}