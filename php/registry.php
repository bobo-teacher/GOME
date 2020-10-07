<?php
include "conn.php";

//1.用户名重名的检测
if(isset($_POST["username"]) || isset($_POST["submit"])){
    $name = $_POST["username"];
    $result = $conn->query("select * from registry where username='$name'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}else{
    echo "非法操作";
}

//2.接收前端表单传入的数据 - submit
//跳转到登陆页面
if(isset($_POST["submit"])){
    $name = $_POST["username"];
    $pass = sha1($_POST["password"]);
    $conn->query("insert registry values(default,'$name','$pass',NOW())");
    header('location:http://localhost:8080/fuwuqi/GOME/src/login.html');
}

