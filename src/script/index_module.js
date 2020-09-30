define([],function(){
    return {
        init:function(){
            // 头部HTML加载
            // $(document).ready(function () {
            //     $("#mm").load("head.html")
            //     $("#bb").load("./script/header.js")
            //     console.log("头部进来了")
            // });
            
            $everydayli = $("#everydaylist li");
            $oneF_ul = $(".oneF_r ul")
            $.ajax({
                url:"http://localhost:8080/fuwuqi/GOME/php/index_everyday_rander.php",
                dataType:"json"
            }).done(function(data){
                //渲染美日抢购
                $.each(data,function(index,value){
                    $everydayli.eq(index).find("img").attr("src",value.url);
                    $everydayli.eq(index).find(".price").html("¥" + value.price);
                    $everydayli.eq(index).find(".title").html(value.title);
                })

                //渲染楼层
                $randerstr = "";
                $.each(data,function(index,value){
                    $randerstr += `
                    <li>
                        <a href="">
                            <img src="${value.url}" alt="">
                            <p class="title">${value.title}</p>
                            <p class="price">¥${value.price}</p>
                        </a>
                    </li>
                    `
                    if(index > 8){
                        return false;
                    }
                })
                $oneF_ul.html($randerstr)
            })

            //关闭广告图
            $close_a = $("header a");
            $header = $("header");
            $close_a.click(function(){
                console.log(1);
                $header.hide();
            })

            //导航栏hover效果(字体颜色)
            $nav_li = $("nav li").not(".login");
            $nav_li.hover(function(){
                $(this).find("a").addClass("active")
            },function(){
                $(this).find("a").not(".second").removeClass("active")
            })

            //登陆按钮hover效果(字体颜色)
            $(".login .first").hover(function(){
                $(this).addClass("active")
            },function(){
                $(this).removeClass("active")
            })

            //导航栏hover效果(边框和背景色，隐藏的盒子显示)
            $("nav .arrow").hover(function(){
                $(this).addClass("arrow_active").find(".dropdown").show();
            },function(){
                $(this).removeClass("arrow_active").find(".dropdown").hide();
            })

            //搜索栏hover效果
            $(".tosearch label").hover(function(){
                $(".search_hide").show();
            },function(){
                $(".search_hide").hide();
            })
            $(".search_hide").hover(function(){
                $(".search_hide").show();
            },function(){
                $(".search_hide").hide();
            })

            //购物车hover效果
            $(".shopcartbox .count").hover(function(){
                $(".shopcartbox .count").addClass("active")
            },function(){
                $(".shopcartbox .count").removeClass("active")
            })

            //顶部悬浮
            let top = $(window).scrollTop()
            if(top > 500){
                $(".search_box").stop().animate({
                    top:0
                },0);
                $(".search_box").css("z-index",99);
                $(".topsearch,.menu_h2").css({
                    "position":"fixed",
                    "top":10,
                    "z-index":100
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
            }else{
                $(".search_box").stop().animate({
                    top:-100
                },0)
                $(".topsearch,.menu_h2").css({
                    "position":"static",
                    "display":"block"
                });
                $(".menu_h2 span").hide();
                // $(".banner_hide").css({
                //     "position":"absolute",
                //     "left":200
                // })
            }
            $(window).on("scroll",function(){
                top = $(this).scrollTop()
                if(top > 500){
                    $(".search_box").stop().animate({
                        top:0
                    },0);
                    $(".search_box").css("z-index",99);
                    $(".topsearch,.menu_h2").css({
                        "position":"fixed",
                        "top":10,
                        "z-index":100
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
                }else{
                    $(".search_box").stop().animate({
                        top:-100
                    },0)
                    $(".topsearch,.menu_h2").css({
                        "position":"static",
                        "display":"block"
                    });
                    $(".menu_h2 span").hide();
                    // $(".banner_hide").css({
                    //     "position":"absolute",
                    //     "left":200
                    // })
                }
            })

            //搜索框提示文字变换
            $arr = ["空调","美的空调","海尔洗衣机","华为手机","海尔冰箱","热水器","冰箱","手机","洗衣机"]
            let count = 0;
            setInterval(() => {
                $(".tosearch input").attr("placeholder",$arr[count]);
                count++;
                if(count == $arr.length){
                    count = 0;
                }
            }, 3000);

            //菜单栏hover效果
            $(".menu ul a").hover(function(){
                $(this).addClass("active")
            },function(){
                $(this).removeClass("active")
            })

            //菜单栏轮播图
            $(".arrow_up").on("click",function(){
                $(".menu .wrap ul").stop(true).animate({
                    top:-40
                },function(){
                    $(".menu .wrap ul").css("top",0)
                }) 
            })

            $(".arrow_down").on("click",function(){
                $(".menu .wrap ul").css("top",-40)
                $(".menu .wrap ul").stop(true).animate({
                    top:0
                })
            })

            let timer = setInterval(() => {
                $(".menu .wrap ul").stop(true).animate({
                    top:-40
                },function(){
                    $(".menu .wrap ul").css("top",0)
                })
            }, 2000);

            $(".menu .wrap").hover(function(){
                clearInterval(timer);
            },function(){
                timer = setInterval(() => {
                    $(".menu .wrap ul").stop(true).animate({
                        top:-40
                    },function(){
                        $(".menu .wrap ul").css("top",0)
                    })
                }, 2000);
            })

            //列表页入口
            $(".banner .left li,.banner_hide").hover(function(){
                $(".banner_hide").show()
            },function(){
                $(".banner_hide").hide()
            })
            $(window).on("scroll",function(){
                let $top = $(this).scrollTop();
                if($top > $(".banner").offset().top){
                    $(".banner_hide").stop().animate({
                        top:$top - $(".banner").offset().top
                    })
                }else{
                    $(".banner_hide").stop().animate({
                        top:0
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
            $dotlist.on("mouseover",function(){
                $index = $(this).index();
                $(this).addClass("active").siblings().removeClass("active");
                $piclist.eq($(this).index()).animate({
                    "opacity":1
                }).siblings().animate({
                    "opacity":0
                })
            })
            $right.on("click",function(){
                $index++;
                if($index == $dotlist.length){
                    $index = 0;
                }
                $dotlist.eq($index).addClass("active").siblings().removeClass("active");
                $piclist.eq($index).animate({
                    "opacity":1
                }).siblings().animate({
                    "opacity":0
                })
            })
            $left.on("click",function(){
                $index--;
                if($index == -1){
                    $index = $dotlist.length - 1;
                }
                $dotlist.eq($index).addClass("active").siblings().removeClass("active");
                $piclist.eq($index).animate({
                    "opacity":1
                }).siblings().animate({
                    "opacity":0
                })
            })
            timer1 = setInterval(() => {
                console.log($dotlist.length);
                $index++;
                    if($index == $dotlist.length){
                        $index = 0;
                    }
                    $dotlist.eq($index).addClass("active").siblings().removeClass("active");
                    $piclist.eq($index).animate({
                        "opacity":1
                    }).siblings().animate({
                        "opacity":0
                    })
            }, 3000);
            $(".banner .middle").hover(function(){
                clearInterval(timer1)
            },function(){
                timer1 = setInterval(() => {
                    $index++;
                    if($index == $dotlist.length){
                        $index = 0;
                    }
                    $dotlist.eq($index).addClass("active").siblings().removeClass("active");
                    $piclist.eq($index).animate({
                        "opacity":1
                    }).siblings().animate({
                        "opacity":0
                    })
                }, 3000);
            })
        }
    }
})