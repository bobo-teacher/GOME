define(['sha1','jcookie'],function(){
    return {
        init:function(){
            const $login = $("button");
            const $ainput = $("input");
            $login.on("click",function(){
                $.ajax({
                    type:"post",
                    url:"http://localhost:8080/fuwuqi/GOME/php/login.php",
                    data:{
                        username:$ainput[0].value,
                        password:hex_sha1($ainput[1].value)
                    }
                }).done(function(data){
                    if(data){
                        location.href = "index1.html";
                        $.cookie("username",$ainput[0].value,{ expires: 365, path: '/' })
                    }else{
                        $(".warn").show();
                        $ainput[0].value = "";
                        $ainput[1].value = "";
                    }
                })
            })
        }
    }
})