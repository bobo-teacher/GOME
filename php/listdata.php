<?php
include "conn.php";

//解决跨域
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');

//单个页面加载的条数
$pagesize = 10;

//获取数据
$result = $conn->query("select * from taobaogoods");

//获取数据条数
$num = $result->num_rows;

//计算页数
$pagenum = $num / $pagesize;

//获取前端传输过来的页码
if(isset($_GET["page"])){
    $pagevalue = $_GET["page"];
}else{
    $pagevalue = 1;
}

//计算起始位置
$start = ($pagevalue - 1) * $pagesize;

//limit
//limit接收一个或者两个数字参数(整数)
//参1：数据开始位置的索引(从0开始)，偏移量
//参2：返回的记录集数目。
//limit 0,10  从偏移量0开始 取10条
//limit 10,10  从偏移量10开始 取10条
//limit 20,10 从偏移量20开始 取10条
$data = $conn->query("select * from taobaogoods limit $start,$pagesize");

$arr = Array();
for($i = 0;$i < $data->num_rows;$i++){
    $arr[$i] = $data->fetch_assoc();
}

echo json_encode($arr);