function search(){
    var str=document.getElementById("key").value;
    var xmlhttp;
    var form={"key":str};
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
            
            var data=xmlhttp.responseText;
            var data1=JSON.parse(data);
            
            document.getElementById("content").innerHTML=JSON.stringify(data1);
           
            
        }
    }
    xmlhttp.open("POST", "http://127.0.0.1:3000/keysearch", true);
    xmlhttp.setRequestHeader("Content-type","application/json");//需要设置成application/json
    xmlhttp.send(JSON.stringify(form)); //body-parser解析的是字符串，所以需要把json对象转换成字符串
}
function onsale(){
    
}