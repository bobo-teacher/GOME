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

            //导航栏hover效果(边框和背景色)
            $("nav .arrow").hover(function(){
                $(this).addClass("arrow_active").find(".dropdown").show();
            },function(){
                $(this).removeClass("arrow_active").find(".dropdown").hide()
            })
        }
    }
})