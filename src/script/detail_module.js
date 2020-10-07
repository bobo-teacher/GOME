define(['jcookie'], function () {
    return {
        init: function () {
            //获取地址栏的sid，将sid通过ajax传给后端，并将后端返回的数据进行渲染
            const $oUl = $("#list ul");
            const $title = $(".detail_r .title");
            const $price = $(".detail_r .price");
            const $old = $(".detail_r .old");
            const $num = $(".detail_r .num");
            let $datasid = location.search.slice(1).split("=")[1];
            const $smallpic = $("#smallpic");
            const $spic = $(".spic");
            const $bpic = $("#bpic");
            const $sf = $("#sf");
            const $bf = $("#bf");
            const $wrap = $(".detail_l");
            const $glass = $(".glass");
            const $left = $("#left");
            const $right = $("#right");

            $.ajax({
                url: "http://localhost:8080/fuwuqi/GOME/php/getsid.php",
                dataType: "json",
                data: {
                    sid: $datasid
                }
            }).done((data) => {
                let $arr = data.piclisturl.split(",");
                let $renderstr = "";
                $smallpic.prop("src", data.url);
                $bpic.prop("src", data.url);
                $title.html(data.title);
                $price.html("¥" + data.price);
                $old.html("¥" + data.price * 1.5);
                $num.html(data.sailnumber);
                $oUl.css("width", 87 * $arr.length);
                $.each($arr, function (index, value) {
                    $renderstr += `
                        <li>
                            <img src="${value}">
                        </li>
                    `;
                })
                $oUl.html($renderstr);
            })

            //放大镜
            $spic.on("mouseover", function () {
                $sf.show();
                $bf.show();
                $glass.hide();

                $spic.on("mousemove", function (e) {
                    let $l = e.pageX - $wrap.offset().left - $sf.outerWidth() / 2;
                    let $t = e.pageY - $wrap.offset().top - $sf.outerHeight() / 2;
                    let $wbili = $spic.outerWidth() / $sf.outerWidth();
                    let $hbili = $spic.outerHeight() / $sf.outerHeight();
                    let $bili = $bpic.outerHeight() / $smallpic.outerHeight();
                    $bpic.css({
                        width: $bf.outerWidth() * $wbili,
                        height: $bf.outerHeight() * $hbili
                    })
                    if ($l <= 0) {
                        $l = 0;
                    } else if ($l >= $spic.outerWidth() - $sf.outerWidth() - 2) {
                        $l = $spic.outerWidth() - $sf.outerWidth() - 2
                    }
                    if ($t <= 0) {
                        $t = 0;
                    } else if ($t >= $spic.outerHeight() - $sf.outerHeight() - 2) {
                        $t = $spic.outerHeight() - $sf.outerHeight() - 2
                    }
                    $sf.css({
                        left: $l,
                        top: $t
                    })
                    $bpic.css({
                        left: -$l * $bili,
                        top: -$t * $bili
                    })
                })
                $spic.on("mouseout", function () {
                    $sf.hide();
                    $bf.hide();
                    $glass.show();
                })
            })

            //切换小图
            $oUl.on("click", "li", function () {
                $smallpic.prop("src", $(this).find("img").attr("src"));
                $bpic.prop("src", $(this).find("img").attr("src"));
            })

            //小图左右箭头点击事件
            let $piclen = 5;
            $right.on("click", function () {
                $piclen++;
                let $liwidth = $("#list li").eq(0).outerWidth(true);
                if ($piclen <= $("#list li").size()) {
                    $oUl.animate({
                        left: -$liwidth * ($piclen - 5)
                    })
                } else {
                    $piclen--;
                }
            })

            $left.on("click", function () {
                $piclen--;
                console.log($piclen);
                let $liwidth = $("#list li").eq(0).outerWidth(true);
                if ($piclen >= 5) {
                    $oUl.animate({
                        left: -$liwidth * ($piclen - 5)
                    })
                } else {
                    $piclen++;
                }
            })

            //点击购物车将数量存入cookie中
            let $sidarr = [];
            let $numarr = [];
            const $count = $("#count");
            const $cart = $("#cart")
            function getcookie() {
                if ($.cookie("datasid") && $.cookie("datanum")) {
                    $sidarr = $.cookie("datasid").split(",");
                    $numarr = $.cookie("datanum").split(",");
                }
            }
            $cart.on("click", function () {
                getcookie();
                if ($.inArray($datasid, $sidarr) === -1) {
                    $sidarr.push($datasid)
                    $numarr.push($count.val())
                    $.cookie("datasid", $sidarr, { expires: 7, path: '/' });
                    $.cookie("datanum", $numarr, { expires: 7, path: '/' })
                } else {
                    $numarr.splice($.inArray($datasid, $sidarr), 1, +$numarr[$.inArray($datasid, $sidarr)] + +$count.val());
                    $.cookie("datanum", $numarr,{ expires: 7, path: '/' })
                }
            })

            //点击加减对数量进行加减
            $cell = $(".cell");
            $minus = $(".minus");
            $cell.on("click",function(){
                $count.val(+$count.val() + 1)
            })
            $minus.on("click",function(){
                $count.val(+$count.val() - 1)
            })

            //登陆成功显示用户名，点击退出删除cookie
            const $admin = $("#admin");
            const $login = $(".login");
            const $username = $("#admin span")
            const $exit = $("#admin a")
            if($.cookie("username")){
                $username.html($.cookie("username"));
                $admin.show();
                $login.hide();
            }
    
            $exit.on("click", function(){
                $.cookie("username","", { expires: -1 , path: '/' });
                $admin.hide();
                $login.show();
            })
        }
    }
})