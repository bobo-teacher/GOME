define([],function(){
    return {
        init:function(){
            var form = document.querySelector('#registry');
            var username = document.querySelector('.username');
            var password = document.querySelector('.password');
            var password2 = document.querySelector('.password2');
            var telphone = document.querySelector('.telphone');
            var pw = document.querySelector('.pw');
            var tpw = document.querySelector('.tpw');
            var aSpan = document.querySelectorAll('#registry span');
            var submit = document.querySelector('.submit');
    
            var userflag = false;
            var phoneflag = false;
            var passflag = false;
            var pass2flag = false;
            var pwflag = false;
            var tpwflag = false;
    
            username.onfocus = function () {
                aSpan[0].innerHTML = "支持中文、字母、数字、“-”、“_”的组合，4-20个字符";
                aSpan[0].style.color = "#666";
                // if (userflag == true) {
                //     aSpan[0].innerHTML = "恭喜✅";
                //     aSpan[0].style.color = "green";
                // }
            }

            username.onblur = function(){
                let user = username.value;
                var userlen = username.value.length;
                var reg = /^[a-zA-Z\u4e00-\u9fa5\d-_]+$/;
                if (username.value != "") {
                    if (userlen >= 4 && userlen <= 20) {
                        if (reg.test(username.value)) {
                            $.ajax({
                                type:"post",
                                url:"http://localhost:8080/fuwuqi/loginregistry2/php/registry.php",
                                data:{
                                    username:user
                                }
                            }).done((data)=>{
                                if(!data){
                                    console.log(111);
                                    aSpan[0].innerHTML = "恭喜✅";
                                    aSpan[0].style.color = "green";
                                    userflag = true;
                                }else{
                                    aSpan[0].innerHTML = "用户名已存在，请重新输入";
                                    aSpan[0].style.color = "red";
                                    userflag = false;
                                }
                            })
                        } else {
                            aSpan[0].innerHTML = "用户名只能由中文、字母、数字、“-”、“_”组成";
                            aSpan[0].style.color = "red";
                            userflag = false;
                        }
                    } else {
                        aSpan[0].innerHTML = "用户名长度4-20个字符";
                        aSpan[0].style.color = "red";
                        userflag = false;
                    }
                } else {
                    aSpan[0].innerHTML = "用户名不能为空";
                    aSpan[0].style.color = "red";
                    userflag = false;
                }
                


            }
    
            /* username.onblur = function () {
                var userlen = username.value.length;
                var reg = /^[a-zA-Z\u4e00-\u9fa5\d-_]+$/
                if (username.value != "") {
                    if (userlen >= 4 && userlen <= 20) {
                        if (reg.test(username.value)) {
                            aSpan[0].innerHTML = "恭喜✅";
                            aSpan[0].style.color = "green";
                            userflag = true;
                        } else {
                            aSpan[0].innerHTML = "用户名只能由中文、字母、数字、“-”、“_”组成";
                            aSpan[0].style.color = "red";
                            userflag = false;
                        }
                    } else {
                        aSpan[0].innerHTML = "用户名长度4-20个字符";
                        aSpan[0].style.color = "red";
                        userflag = false;
                    }
                } else {
                    aSpan[0].innerHTML = "用户名不能为空";
                    aSpan[0].style.color = "red";
                    userflag = false;
                }
            } */
    
            password.onfocus = function () {
                aSpan[1].innerHTML = "建议使用字母、数字和符号两种及以上组合，6-20个字符";
                aSpan[1].style.color = "#666";
                if (passflag == true) {
                    aSpan[1].innerHTML = "恭喜✅";
                    aSpan[1].style.color = "green";
                }
            }
    
            password.oninput = function () {
                if (password.value.length >= 6 && password.value.length <= 20) {
                    var reg1 = /\d/;
                    var reg2 = /[a-zA-Z]/;
                    var reg3 = /[\W\_]/;
                    var count = 0;
                    if (reg1.test(password.value)) {
                        count++;
                    }
                    if (reg2.test(password.value)) {
                        count++;
                    }
                    if (reg3.test(password.value)) {
                        count++;
                    }
                    switch (count) {
                        case 1:
                            aSpan[1].innerHTML = "弱：有被盗风险,建议使用字母、数字和符号两种及以上组合";
                            aSpan[1].style.color = "red";
                            passflag = false;
                            break;
                        case 2:
                            aSpan[1].innerHTML = "中：安全强度适中，可以使用三种以上的组合来提高安全强度";
                            aSpan[1].style.color = "orange";
                            passflag = true;
                            break;
                        case 3:
                            aSpan[1].innerHTML = "强：你的密码很安全";
                            aSpan[1].style.color = "green";
                            passflag = true;
                            break;
                    }
                } else {
                    aSpan[1].innerHTML = "请输入6-20位密码";
                    aSpan[1].style.color = "red";
                    passflag = false;
                }
            }
    
            password.onblur = function () {
                if (password.value != "") {
                    if (passflag) {
                        aSpan[1].innerHTML = "恭喜✅";
                        aSpan[1].style.color = "green";
                        passflag = true;
                    }
                } else {
                    aSpan[1].innerHTML = "密码不能为空";
                    aSpan[1].style.color = "red";
                    passflag = false;
                }
            }
    
            password2.onfocus = function () {
                aSpan[2].innerHTML = "请再次输入密码";
                aSpan[2].style.color = "#666";
                if (pass2flag == true) {
                    aSpan[2].innerHTML = "恭喜✅";
                    aSpan[2].style.color = "green";
                }
            }
    
            password2.onblur = function () {
                if (password.value != "") {
                    if (password2.value === password.value) {
                        aSpan[2].innerHTML = "恭喜✅";
                        aSpan[2].style.color = "green";
                        pass2flag = true;
                    } else {
                        aSpan[2].innerHTML = "您输入的密码不正确";
                        aSpan[2].style.color = "red";
                        pass2flag = false;
                    }
                } else {
                    aSpan[2].innerHTML = "密码不能为空";
                    aSpan[2].style.color = "red";
                    pass2flag = false;
                }
            }
    
            telphone.onfocus = function () {
                aSpan[3].innerHTML = "请输入电话号码";
                aSpan[3].style.color = "#666";
                if (phoneflag == true) {
                    aSpan[3].innerHTML = "恭喜✅";
                    aSpan[3].style.color = "green";
                }
            }
    
            telphone.onblur = function () {
                var reg = /^1\d{10}/
                if (telphone.value != "") {
                    if (reg.test(telphone.value)) {
                        aSpan[3].innerHTML = "恭喜✅";
                        aSpan[3].style.color = "green";
                        phoneflag = true;
                    } else {
                        aSpan[3].innerHTML = "请输入正确的电话号码";
                        aSpan[3].style.color = "red";
                        phoneflag = false;
                    }
                } else {
                    aSpan[3].innerHTML = "电话号码不能为空";
                    aSpan[3].style.color = "red";
                    phoneflag = false;
                }
            }
    
            passcode.onclick = function () {
                var str = '';
                for (var i = 0; i < 4; i++) {
                    var probability = Math.random();//随机一个0-1的数来分配三种可能性
                    if (probability < (1 * 10 / 62)) {
                        str += String.fromCharCode(parseInt(Math.random() * 10 + 48));
                    } else if (probability >= (1 * 10 / 62) && probability < (1 * 36 / 62)) {
                        str += String.fromCharCode(parseInt(Math.random() * 26 + 65));
                    } else {
                        str += String.fromCharCode(parseInt(Math.random() * 26 + 97));
                    }
                }
                passcode.innerHTML = str;
            }
    
            pw.onfocus = function () {
                aSpan[4].innerHTML = "请输入验证码";
                aSpan[4].style.color = "#666";
                if (pwflag == true) {
                    aSpan[4].innerHTML = "恭喜✅";
                    aSpan[4].style.color = "green";
                }
            }
    
            pw.onblur = function () {
                if (pw.value != "") {
                    if (pw.value === passcode.innerHTML) {
                        aSpan[4].innerHTML = "恭喜✅";
                        aSpan[4].style.color = "green";
                        pwflag = true;
                    } else {
                        aSpan[4].innerHTML = "请输入正确的验证码";
                        aSpan[4].style.color = "red";
                        pwflag = false;
    
                    }
                } else {
                    aSpan[4].innerHTML = "验证码不能为空";
                    aSpan[4].style.color = "red";
                    pwflag = false;
                }
            }
    
            passcode2.onclick = function () {
                var str = '';
                for (var i = 0; i < 6; i++) {
                    var probability = Math.random();//随机一个0-1的数来分配三种可能性
                    if (probability < (1 * 10 / 62)) {
                        str += String.fromCharCode(parseInt(Math.random() * 10 + 48));
                    } else if (probability >= (1 * 10 / 62) && probability < (1 * 36 / 62)) {
                        str += String.fromCharCode(parseInt(Math.random() * 26 + 65));
                    } else {
                        str += String.fromCharCode(parseInt(Math.random() * 26 + 97));
                    }
                }
                passcode2.innerHTML = str;
            }
    
            tpw.onfocus = function () {
                aSpan[5].innerHTML = "请输入验证码";
                aSpan[5].style.color = "#666";
                if (tpwflag == true) {
                    aSpan[5].innerHTML = "恭喜✅";
                    aSpan[5].style.color = "green";
                }
            }
    
            tpw.onblur = function () {
                if (tpw.value != "") {
                    if (tpw.value === passcode2.innerHTML) {
                        aSpan[5].innerHTML = "恭喜✅";
                        aSpan[5].style.color = "green";
                        tpwflag = true;
                    } else {
                        aSpan[5].innerHTML = "请输入正确的验证码";
                        aSpan[5].style.color = "red";
                        tpwflag = false;
    
                    }
                } else {
                    aSpan[5].innerHTML = "验证码不能为空";
                    aSpan[5].style.color = "red";
                    tpwflag = false;
                }
            }
            form.onsubmit = function () {
                if (username.value == "") {
                    aSpan[0].innerHTML = "用户名不能为空";
                    aSpan[0].style.color = "red";
                    userflag = false;
                }
                if (password.value == "") {
                    aSpan[1].innerHTML = "密码不能为空";
                    aSpan[1].style.color = "red";
                    passflag = false;
                }
                if (password2.value == "") {
                    aSpan[2].innerHTML = "密码不能为空";
                    aSpan[2].style.color = "red";
                    pass2flag = false;
                }
                if (telphone.value == "") {
                    aSpan[3].innerHTML = "电话号码不能为空";
                    aSpan[3].style.color = "red";
                    phoneflag = false;
                }
                if (pw.value == "") {
                    aSpan[4].innerHTML = "验证码不能为空";
                    aSpan[4].style.color = "red";
                    pwflag = false;
                }
                if (tpw.value == "") {
                    aSpan[4].innerHTML = "验证码不能为空";
                    aSpan[4].style.color = "red";
                    tpwflag = false;
                }
                if (userflag != true || phoneflag != true || passflag != true || pass2flag != true || pwflag != true || tpwflag != true ) {
                    return false;
                }
            }
        }
    }
})