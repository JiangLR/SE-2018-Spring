function submittest() {
    var a = document.getElementById("id").value;
    var b = document.getElementById("name").value;
    var c = document.getElementById("url").value;
    var d = document.getElementById("alexa").value;
    var e = document.getElementById("country").value;
    
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