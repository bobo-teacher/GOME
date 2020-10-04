define([], function () {
    return {
        init: function () {
            // 头部HTML加载
            // $(document).ready(function () {
            //     $("#mm").load("head.html")
            //     $("#bb").load("./script/header.js")
            //     console.log("头部进来了")
            // });

            $everydayli = $("#everydaylist li");
            $youlike_main_li = $(".youlike_main li");
            $oneF_li = $(".oneF .oneF_r li");
            $twoF_li = $(".twoF .oneF_r li");
            $threeF_li = $(".threeF .oneF_r li");
            $fourF_li = $(".fourF .oneF_r li");
            $fiveF_li = $(".fiveF .oneF_r li");
            $sixF_li = $(".sixF .oneF_r li");
            $sevenF_li = $(".sevenF .oneF_r li");
            $.ajax({
                url: "http://localhost:8080/fuwuqi/GOME/php/index_everyday_rander.php",
                dataType: "json"
            }).done(function (data) {
                //渲染美日抢购
                $.each(data, function (index, value) {
                    $everydayli.eq(index).find("img").attr("src", value.url);
                    $everydayli.eq(index).find(".price").html("¥" + value.price);
                    $everydayli.eq(index).find(".title").html(value.title);
                })

                //渲染猜你喜欢
                $.each(data, function (index, value) {
                    $youlike_main_li.eq(index).find("img").attr("src", value.url);
                    $youlike_main_li.eq(index).find(".price").html("¥" + (+value.price).toFixed(2));
                    $youlike_main_li.eq(index).find(".title").html(value.title);
                })

                //渲染楼层
                //一楼
                $.each(data, function (index, value) {
                    $oneF_li.eq(index).find("img").attr("src", value.url);
                    $oneF_li.eq(index).find(".price").html("¥" + (+value.price).toFixed(2));
                    $oneF_li.eq(index).find(".title").html(value.title);
                })

                //二楼
                $.each(data, function (index, value) {
                    $twoF_li.eq(index).find("img").attr("src", value.url);
                    $twoF_li.eq(index).find(".price").html("¥" + (+value.price).toFixed(2));
                    $twoF_li.eq(index).find(".title").html(value.title);
                })

                //三楼
                $.each(data, function (index, value) {
                    $threeF_li.eq(index).find("img").attr("src", value.url);
                    $threeF_li.eq(index).find(".price").html("¥" + (+value.price).toFixed(2));
                    $threeF_li.eq(index).find(".title").html(value.title);
                })

                //四楼
                $.each(data, function (index, value) {
                    $fourF_li.eq(index).find("img").attr("src", value.url);
                    $fourF_li.eq(index).find(".price").html("¥" + (+value.price).toFixed(2));
                    $fourF_li.eq(index).find(".title").html(value.title);
                })

                //五楼
                $.each(data, function (index, value) {
                    $fiveF_li.eq(index).find("img").attr("src", value.url);
                    $fiveF_li.eq(index).find(".price").html("¥" + (+value.price).toFixed(2));
                    $fiveF_li.eq(index).find(".title").html(value.title);
                })

                //六楼
                $.each(data, function (index, value) {
                    $sixF_li.eq(index).find("img").attr("src", value.url);
                    $sixF_li.eq(index).find(".price").html("¥" + (+value.price).toFixed(2));
                    $sixF_li.eq(index).find(".title").html(value.title);
                })

                //七楼
                $.each(data, function (index, value) {
                    $sevenF_li.eq(index).find("img").attr("src", value.url);
                    $sevenF_li.eq(index).find(".price").html("¥" + (+value.price).toFixed(2));
                    $sevenF_li.eq(index).find(".title").html(value.title);
                })
            })

            //关闭广告图
            $close_a = $("header a");
            $header = $("header");
            $close_a.click(function () {
                console.log(1);
                $header.hide();
            })

            //导航栏hover效果(字体颜色)
            $nav_li = $("nav li").not(".login");
            $nav_li.hover(function () {
                $(this).find("a").addClass("active")
            }, function () {
                $(this).find("a").not(".second").removeClass("active")
            })

            //登陆按钮hover效果(字体颜色)
            $(".login .first").hover(function () {
                $(this).addClass("active")
            }, function () {
                $(this).removeClass("active")
            })

            //导航栏hover效果(边框和背景色，隐藏的盒子显示)
            $("nav .arrow").hover(function () {
                $(this).addClass("arrow_active").find(".dropdown").show();
            }, function () {
                $(this).removeClass("arrow_active").find(".dropdown").hide();
            })

            //搜索栏hover效果
            $(".tosearch label").hover(function () {
                $(".search_hide").show();
            }, function () {
                $(".search_hide").hide();
            })
            $(".search_hide").hover(function () {
                $(".search_hide").show();
            }, function () {
                $(".search_hide").hide();
            })

            //购物车hover效果
            $(".shopcartbox .count").hover(function () {
                $(".shopcartbox .count").addClass("active")
            }, function () {
                $(".shopcartbox .count").removeClass("active")
            })

            //顶部悬浮
            let top = $(window).scrollTop()
            if (top > 500) {
                $(".search_box").stop().animate({
                    top: 0
                }, 0);
                $(".search_box").css("z-index", 99);
                $(".topsearch,.menu_h2").css({
                    "position": "fixed",
                    "top": 10,
                    "z-index": 100
                });
                // $(".banner .left_ul").css({
                //     "position":"fixed",
                //     "top":48,
                //     "z-index":100,
                //     "display":"none"
                // });
                $(".menu_h2 span").show();
                // $(".menu_h2,.banner .left_ul,.banner_hide").hover(function(){
                //     $(".banner .left_ul").show()
                // },function(){
                //     $(".banner .left_ul").hide()
                // });

                // $(".banner .left_ul li,.banner_hide").hover(function(){
                //     $(".banner_hide").show()
                //     $(".banner_hide").css({
                //         "position":"fixed",
                //         "top":48
                //     })
                // },function(){
                //     $(".banner_hide").hide()
                // })
            } else {
                $(".search_box").stop().animate({
                    top: -100
                }, 0)
                $(".topsearch,.menu_h2").css({
                    "position": "static",
                    "display": "block"
                });
                $(".menu_h2 span").hide();
                // $(".banner_hide").css({
                //     "position":"absolute",
                //     "left":200
                // })
            }
            $(window).on("scroll", function () {
                top = $(this).scrollTop()
                if (top > 500) {
                    $(".search_box").stop().animate({
                        top: 0
                    }, 0);
                    $(".search_box").css("z-index", 99);
                    $(".topsearch,.menu_h2").css({
                        "position": "fixed",
                        "top": 10,
                        "z-index": 100
                    });
                    // $(".banner .left_ul").css({
                    //     "position":"fixed",
                    //     "top":48,
                    //     "z-index":100,
                    //     "display":"none"
                    // });
                    $(".menu_h2 span").show();
                    // $(".menu_h2,.banner .left_ul,.banner_hide").hover(function(){
                    //     $(".banner .left_ul").show()
                    // },function(){
                    //     $(".banner .left_ul").hide()
                    // });

                    // $(".banner .left_ul li,.banner_hide").hover(function(){
                    //     $(".banner_hide").show()
                    //     $(".banner_hide").css({
                    //         "position":"fixed",
                    //         "top":48
                    //     })
                    // },function(){
                    //     $(".banner_hide").hide()
                    // })
                } else {
                    $(".search_box").stop().animate({
                        top: -100
                    }, 0)
                    $(".topsearch,.menu_h2").css({
                        "position": "static",
                        "display": "block"
                    });
                    $(".menu_h2 span").hide();
                    // $(".banner_hide").css({
                    //     "position":"absolute",
                    //     "left":200
                    // })
                }
            })

            //搜索框提示文字变换
            $arr = ["空调", "美的空调", "海尔洗衣机", "华为手机", "海尔冰箱", "热水器", "冰箱", "手机", "洗衣机"]
            let count = 0;
            setInterval(() => {
                $(".tosearch input").attr("placeholder", $arr[count]);
                count++;
                if (count == $arr.length) {
                    count = 0;
                }
            }, 3000);

            //菜单栏hover效果
            $(".menu ul a").hover(function () {
                $(this).addClass("active")
            }, function () {
                $(this).removeClass("active")
            })

            //菜单栏轮播图
            $(".arrow_up").on("click", function () {
                $(".menu .wrap ul").stop(true).animate({
                    top: -40
                }, function () {
                    $(".menu .wrap ul").css("top", 0)
                })
            })

            $(".arrow_down").on("click", function () {
                $(".menu .wrap ul").css("top", -40)
                $(".menu .wrap ul").stop(true).animate({
                    top: 0
                })
            })

            let timer = setInterval(() => {
                $(".menu .wrap ul").stop(true).animate({
                    top: -40
                }, function () {
                    $(".menu .wrap ul").css("top", 0)
                })
            }, 2000);

            $(".menu .wrap").hover(function () {
                clearInterval(timer);
            }, function () {
                timer = setInterval(() => {
                    $(".menu .wrap ul").stop(true).animate({
                        top: -40
                    }, function () {
                        $(".menu .wrap ul").css("top", 0)
                    })
                }, 2000);
            })

            //列表页入口
            $(".banner .left li,.banner_hide").hover(function () {
                $(".banner_hide").show()
            }, function () {
                $(".banner_hide").hide()
            })
            $(window).on("scroll", function () {
                let $top = $(this).scrollTop();
                if ($top > $(".banner").offset().top) {
                    $(".banner_hide").stop().animate({
                        top: $top - $(".banner").offset().top
                    })
                } else {
                    $(".banner_hide").stop().animate({
                        top: 0
                    })
                }
            })

            //轮播图
            $piclist = $(".middle ul li");
            $dotlist = $(".middle ol li");
            $left = $("#left");
            $right = $("#right");
            $index = $dotlist.length - 1;
            let timer1 = null;
            $dotlist.on("mouseover", function () {
                $index = $(this).index();
                $(this).addClass("active").siblings().removeClass("active");
                $piclist.eq($(this).index()).animate({
                    "opacity": 1
                }).siblings().animate({
                    "opacity": 0
                })
            })
            $right.on("click", function () {
                $index++;
                if ($index == $dotlist.length) {
                    $index = 0;
                }
                $dotlist.eq($index).addClass("active").siblings().removeClass("active");
                $piclist.eq($index).animate({
                    "opacity": 1
                }).siblings().animate({
                    "opacity": 0
                })
            })
            $left.on("click", function () {
                $index--;
                if ($index == -1) {
                    $index = $dotlist.length - 1;
                }
                $dotlist.eq($index).addClass("active").siblings().removeClass("active");
                $piclist.eq($index).animate({
                    "opacity": 1
                }).siblings().animate({
                    "opacity": 0
                })
            })
            timer1 = setInterval(() => {
                console.log($dotlist.length);
                $index++;
                if ($index == $dotlist.length) {
                    $index = 0;
                }
                $dotlist.eq($index).addClass("active").siblings().removeClass("active");
                $piclist.eq($index).animate({
                    "opacity": 1
                }).siblings().animate({
                    "opacity": 0
                })
            }, 3000);
            $(".banner .middle").hover(function () {
                clearInterval(timer1)
            }, function () {
                timer1 = setInterval(() => {
                    $index++;
                    if ($index == $dotlist.length) {
                        $index = 0;
                    }
                    $dotlist.eq($index).addClass("active").siblings().removeClass("active");
                    $piclist.eq($index).animate({
                        "opacity": 1
                    }).siblings().animate({
                        "opacity": 0
                    })
                }, 3000);
            })

            //倒计时
            lastTime();
            function lastTime() {
                let $lastDate = new Date(2020,9,5,18,0,0);//设置未来时间
                let $date = new Date();//获取当前时间
                let $tolal = parseInt(($lastDate.getTime() - $date.getTime()) / 1000);//距离未来时间的总秒数
                let $sec = doubleNum($tolal % 60);
                let $min = doubleNum(parseInt($tolal / 60) % 60);
                let $hour = doubleNum(parseInt($tolal / 3600) % 24);
                $("#hour").html($hour);
                $("#min").html($min);
                $("#sec").html($sec);
            }
            setInterval(() => {
                lastTime()
            }, 1000);
            function doubleNum(n) {
                if (n < 10) {
                    return "0" + n;
                } else {
                    return n;
                }
            }

            //猜你喜欢按钮点击切换商品列表
            const $youlike_left = $(".youlike .left");
            const $youlike_right = $(".youlike .right");
            const $youlike_ul = $(".youlike ul");
            let $youlike_index = 0;
            $youlike_right.on("click",function(){
                $youlike_index++;
                if($youlike_index == $youlike_ul.length){
                    $youlike_index = 0;
                }
                $youlike_ul.eq($youlike_index).animate({
                    opacity:1
                }).siblings().animate({
                    opacity:0
                })
            })
            $youlike_left.on("click",function(){
                $youlike_index--;
                if($youlike_index == -1){
                    $youlike_index = $youlike_ul.length - 1;
                }
                $youlike_ul.eq($youlike_index).animate({
                    opacity:1
                }).siblings().animate({
                    opacity:0
                })
            })

            //一楼tab切换
            $oneF_tab = $(".oneF .tab li");
            $oneF_ul = $(".oneF .oneF_r ul");
            $oneF_next = $(".oneF .oneF_r .next");
            $oneF_index = 0;
            $oneF_timer = null;
            $oneF_tab.on("mouseover",function(){
                clearTimeout($oneF_timer);
                $oneF_timer = setTimeout(() => {
                    $oneF_index = $(this).index();
                    $(this).addClass("active").siblings().removeClass("active");
                    $oneF_ul.eq($oneF_index).show().siblings().not(".next").hide();
                }, 300); 
            })
            $oneF_next.on("click",function(){
                $oneF_index++;
                if($oneF_index == $oneF_ul.length){
                    $oneF_index = 0;
                }
                $oneF_tab.eq($oneF_index).addClass("active").siblings().removeClass("active");
                $oneF_ul.eq($oneF_index).show().siblings().not(".next").hide();
            })

            //二楼tab切换
            $twoF_tab = $(".twoF .tab li");
            $twoF_ul = $(".twoF .oneF_r ul");
            $twoF_next = $(".twoF .oneF_r .next");
            $twoF_index = 0;
            $twoF_timer = null;
            $twoF_tab.on("mouseover",function(){
                clearTimeout($twoF_timer);
                $twoF_timer = setTimeout(() => {
                    $twoF_index = $(this).index();
                    $(this).addClass("active").siblings().removeClass("active");
                    $twoF_ul.eq($twoF_index).show().siblings().not(".next").hide();
                }, 300); 
            })
            $twoF_next.on("click",function(){
                $twoF_index++;
                if($twoF_index == $twoF_ul.length){
                    $twoF_index = 0;
                }
                $twoF_tab.eq($twoF_index).addClass("active").siblings().removeClass("active");
                $twoF_ul.eq($twoF_index).show().siblings().not(".next").hide();
            })

            //三楼tab切换
            $threeF_tab = $(".threeF .tab li");
            $threeF_ul = $(".threeF .oneF_r ul");
            $threeF_next = $(".threeF .oneF_r .next");
            $threeF_index = 0;
            $threeF_timer = null;
            $threeF_tab.on("mouseover",function(){
                clearTimeout($threeF_timer);
                $threeF_timer = setTimeout(() => {
                    $threeF_index = $(this).index();
                    $(this).addClass("active").siblings().removeClass("active");
                    $threeF_ul.eq($threeF_index).show().siblings().not(".next").hide();
                }, 300); 
            })
            $threeF_next.on("click",function(){
                $threeF_index++;
                if($threeF_index == $threeF_ul.length){
                    $threeF_index = 0;
                }
                $threeF_tab.eq($threeF_index).addClass("active").siblings().removeClass("active");
                $threeF_ul.eq($threeF_index).show().siblings().not(".next").hide();
            })

            //四楼tab切换
            $fourF_tab = $(".fourF .tab li");
            $fourF_ul = $(".fourF .oneF_r ul");
            $fourF_next = $(".fourF .oneF_r .next");
            $fourF_index = 0;
            $fourF_timer = null;
            $fourF_tab.on("mouseover",function(){
                clearTimeout($fourF_timer);
                $fourF_timer = setTimeout(() => {
                    $fourF_index = $(this).index();
                    $(this).addClass("active").siblings().removeClass("active");
                    $fourF_ul.eq($fourF_index).show().siblings().not(".next").hide();
                }, 300); 
            })
            $fourF_next.on("click",function(){
                $fourF_index++;
                if($fourF_index == $fourF_ul.length){
                    $fourF_index = 0;
                }
                $fourF_tab.eq($fourF_index).addClass("active").siblings().removeClass("active");
                $fourF_ul.eq($fourF_index).show().siblings().not(".next").hide();
            })

            //五楼tab切换
            $fiveF_tab = $(".fiveF .tab li");
            $fiveF_ul = $(".fiveF .oneF_r ul");
            $fiveF_next = $(".fiveF .oneF_r .next");
            $fiveF_index = 0;
            $fiveF_timer = null;
            $fiveF_tab.on("mouseover",function(){
                clearTimeout($fiveF_timer);
                $fiveF_timer = setTimeout(() => {
                    $fiveF_index = $(this).index();
                    $(this).addClass("active").siblings().removeClass("active");
                    $fiveF_ul.eq($fiveF_index).show().siblings().not(".next").hide();
                }, 300); 
            })
            $fiveF_next.on("click",function(){
                $fiveF_index++;
                if($fiveF_index == $fiveF_ul.length){
                    $fiveF_index = 0;
                }
                $fiveF_tab.eq($fiveF_index).addClass("active").siblings().removeClass("active");
                $fiveF_ul.eq($fiveF_index).show().siblings().not(".next").hide();
            })

            //六楼tab切换
            $sixF_tab = $(".sixF .tab li");
            $sixF_ul = $(".sixF .oneF_r ul");
            $sixF_next = $(".sixF .oneF_r .next");
            $sixF_index = 0;
            $sixF_timer = null;
            $sixF_tab.on("mouseover",function(){
                clearTimeout($sixF_timer);
                $sixF_timer = setTimeout(() => {
                    $sixF_index = $(this).index();
                    $(this).addClass("active").siblings().removeClass("active");
                    $sixF_ul.eq($sixF_index).show().siblings().not(".next").hide();
                }, 300); 
            })
            $sixF_next.on("click",function(){
                $sixF_index++;
                if($sixF_index == $sixF_ul.length){
                    $sixF_index = 0;
                }
                $sixF_tab.eq($sixF_index).addClass("active").siblings().removeClass("active");
                $sixF_ul.eq($sixF_index).show().siblings().not(".next").hide();
            })

            //七楼tab切换
            $sevenF_tab = $(".sevenF .tab li");
            $sevenF_ul = $(".sevenF .oneF_r ul");
            $sevenF_next = $(".sevenF .oneF_r .next");
            $sevenF_index = 0;
            $sevenF_timer = null;
            $sevenF_tab.on("mouseover",function(){
                clearTimeout($sevenF_timer);
                $sevenF_timer = setTimeout(() => {
                    $sevenF_index = $(this).index();
                    $(this).addClass("active").siblings().removeClass("active");
                    $sevenF_ul.eq($sevenF_index).show().siblings().not(".next").hide();
                }, 300); 
            })
            $sevenF_next.on("click",function(){
                $sevenF_index++;
                if($sevenF_index == $sevenF_ul.length){
                    $sevenF_index = 0;
                }
                $sevenF_tab.eq($sevenF_index).addClass("active").siblings().removeClass("active");
                $sevenF_ul.eq($sevenF_index).show().siblings().not(".next").hide();
            })

            //楼梯效果
            const $louti = $("#elevator");
            const $loutili = $(".louti li");
            const $louceng = $("main .louceng");
            let $top = $(window).scrollTop();
            $top > 1300 && $top < 5500 ? $louti.show() : $louti.hide();
            $(window).on("scroll", function () {
                let $top = $(window).scrollTop();
                $top > 1300 && $top < 5500 ? $louti.show() : $louti.hide();
                $louceng.each(function (index, element) {
                    let $loucengtop = $(element).offset().top;
                    if ($loucengtop > $top) {
                        $loutili.removeClass('active'); //所有的楼梯移除类。
                        $loutili.eq(index).addClass('active'); //当前第一个满足条件的添加active
                        return false; //循环结束
                    }
                })
            })

            $loutili.on("click", function () {
                $(this).addClass("active").siblings().removeClass("active");
                $loucengtop = $louceng.eq($(this).index()).offset().top;
                $("html,body").animate({
                    scrollTop: $loucengtop - 50
                })
            })

            $("#elevator .up").on("click", function () {
                $("html,body").animate({
                    scrollTop: 0
                })
            })

            $("#elevator .down").on("click", function () {
                $("html,body").animate({
                    scrollTop: $("body").height() - document.documentElement.clientHeight
                })
            })
        }
    }
})