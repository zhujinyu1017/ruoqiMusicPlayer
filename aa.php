<?php
/* 是否导入 Sass 类型的 Stylesheet 文件 */
$use_scss = false;
//var_dump($has_member);
/* 标识是否为开发模式 */
$DEV_MODE = $this->dev;
/* 是否搜狗定制 */
$CUSTOMIZED_FOR_SOGOU = $request_from === 'sogou';

/*tabbar数据*/
$data_tabbar = json_decode( $index_model );
/* 用于获取验证码 */
$IMG_CODE_SERVER = $DEV_MODE ? LAIREN_END_POINT.'/captcha?r=' : 'https://api.lairen.com/captcha?r=';

/* App 嵌入模式 */
$built_in_app_class = ! is_null( $built_in_app ) && $built_in_app ? 'lr-app' : null;
/**
 * 禁用 Cache
 * 1: 如果你要使用 Chrome DevTools 中的 Workspace 功能, 那么需要注释该行;
 * 2: 微信环境使用, 仅限于开发期间;
 */
$disable_cache = $DEV_MODE ? '?cache='.time() : '';

/**
 * 暂时在这里定义方法用来引入'渠道定制UI'资源.
 *
 * @param $channel 渠道 id 也就是对应的 lot_no_id
 * @param $disable_cache
 */
function import_channel_style_directive($channel, $disable_cache) {
	if ( $channel )
		echo '<link rel="stylesheet" href="/css/prod/channel/'.$channel.'.css?t='.$disable_cache.'" type="text/css"/>';
}

/**
 * 暂时在这里定义方法用来引入'渠道定制UI'脚本资源.
 *
 * @param $channel
 * @param $disable_cache
 */
function import_channel_script_directive($channel, $disable_cache) {
	if ( $channel )
		echo '<script type="text/javascript" charset="utf-8" src="/js/prod/channel/'.$channel.'.js?t='.$disable_cache.'"></script>';
}

function import_css($path, $disable_cache) {
	echo '<link rel="stylesheet" href="'.LAIREN_ASSET_PATH.'css/'.$path.'.css'.$disable_cache.'" type="text/css"/>';
}

function import_scss($path, $disable_cache) {
	echo '<link rel="stylesheet" href="'.LAIREN_ASSET_PATH.'sass/'.$path.'.scss'.$disable_cache.'" type="text/css"/>';
}

/**
 * 用于导入 CSS 文件, 依照 DEV_MODE 来确定是载入远程主机还是本地的资源.
 *
 * @param $path
 * @param $use_scss
 * @param $disable_cache
 */
function import_stylesheet($path, $use_scss, $disable_cache) {
	$use_scss
		? import_scss( $path, $disable_cache )
		: import_css( $path, $disable_cache );
}

/**
 * 导入 Javascript 文件.
 *
 * @param $path
 * @param $disable_cache
 */
function import_js($path, $disable_cache, $native_app_present_mode) {
	if( $native_app_present_mode ){
		return;
	}
	echo '<script type="text/javascript" charset="utf-8" src="'.LAIREN_ASSET_PATH.'js/'.$path.'.js'.$disable_cache.'"></script>';
}
?>
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, height=device-height, user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1" /><base target="_self" /><title><?php echo $page_title; ?></title><meta name="description" content="<?php echo $page_description; ?>"><meta name="apple-itunes-app" content="app-id=951644075, app-argument=https://v5.lairen.com"><meta name="apple-mobile-web-app-title" content="来人到家触屏版"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="white"><meta name="format-detection" content="telephone=no"><meta name="msapplication-tap-highlight" content="no"><meta http-equiv="Expires" CONTENT="-1"><meta http-equiv="Cache-Control" CONTENT="no-cache"><meta http-equiv="Pragma" CONTENT="no-cache"><link rel="dns-prefetch" href="//m.lairen.com"><link rel="dns-prefetch" href="//card.lairen.com">
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo LAIREN_ASSET_PATH ?>img/iphone-white-red.png" />
	<?php if ( $DEV_MODE ) { ?>
		<!--  Web app page style  -->
		<?php

//    import_stylesheet( "xui", $use_scss, $disable_cache );
//    import_stylesheet( "libs/xbase.0.0.24", $use_scss, $disable_cache );
		import_stylesheet( "style", $use_scss, $disable_cache );

//    import_stylesheet( "libs/swiper.min", $use_scss, $disable_cache );
//    import_stylesheet( "libs/animate.min", $use_scss, $disable_cache );

//    import_stylesheet( "app/coupons", $use_scss, $disable_cache );
		import_stylesheet( "index/home", $use_scss, $disable_cache );
		import_stylesheet( "index/order.statistics", $use_scss, $disable_cache );
		import_stylesheet( "index/price.control", $use_scss, $disable_cache );
		import_stylesheet( "index/service.management", $use_scss, $disable_cache );
		import_stylesheet( "index/technician.salary", $use_scss, $disable_cache );
		import_stylesheet( "index/reward.punishment", $use_scss, $disable_cache );
		import_stylesheet( "index/user.rank", $use_scss, $disable_cache );

		import_stylesheet( "index/user.info", $use_scss, $disable_cache );
		import_stylesheet( "index/sms.verification", $use_scss, $disable_cache );
//    import_stylesheet( "index/sms.code", $use_scss, $disable_cache );

		import_stylesheet( "index/order", $use_scss, $disable_cache ); //订单查询
		import_stylesheet( "index/recharge", $recharge, $disable_cache ); //订单查询

		import_stylesheet( "index/complaints", $use_scss, $disable_cache ); //投诉处理

		import_stylesheet( "index/qa", $use_scss, $disable_cache ); //QA编辑
		import_stylesheet( "index/feedback", $use_scss, $disable_cache ); //意见反馈

		import_stylesheet( "index/technician.info", $use_scss, $disable_cache );
		import_stylesheet( "index/level.manage", $use_scss, $disable_cache ); //等级管理
		import_stylesheet( "index/remuneration.manage", $use_scss, $disable_cache ); //报酬管理

		import_stylesheet( "index/coupons", $use_scss, $disable_cache );//优惠券

		import_stylesheet( "index/franchisee.manage", $use_scss, $disable_cache );//优惠券

		import_stylesheet( "index/example", $use_scss, $disable_cache );//样式示例


		/*--------------------以下为统计后台新增css-------------------------*/
		import_stylesheet( "index/edit.map", $use_scss, $disable_cache );//地图编辑

		import_stylesheet( "transaction/summary", $use_scss, $disable_cache ); //交易汇总
		import_stylesheet( "transaction/profile", $use_scss, $disable_cache ); //交易概况
		import_stylesheet( "transaction/search", $use_scss, $disable_cache ); //交易查询
		import_stylesheet( "transaction/statistics", $use_scss, $disable_cache ); //交易统计


		?>
		<!--  Web app page style  -->
	<?php } else {
		import_stylesheet( "{{PATTERN_PROD_APP_CSS}}", $use_scss, $disable_cache );
	} ?>
</head><body id="lairen_viewport" class="x-ui<?php echo ($CUSTOMIZED_FOR_SOGOU ? ' lai-sogou' : ''); echo ( is_null( $built_in_app_class ) ? '' : ' '.$built_in_app_class ); ?>"><?php echo $this->getContent(); ?><?php /*欢迎页 */?>
<script async><?php
		/**
		 * 这里仅作定义:
		 * backend_url      用于协调相对路径问题
		 * tap              用于兼容 触摸与非触摸设备 click 事件的切换;
		 * begin            起始界面;
		 * lairen_asset_path 表态资源路径;
		 * region           当前地域信息;
		 * makeCall         请求拨打 400 服务热线;
		 * me               当前帐号部分信息;
		 *
		 * 这些界面不显示 welcome
		 * pay:1,"pay/problem":1,"3d/topup":1,"topup/ok":1,"misc/contact":1,"booking/ok":1
		 *
		 * document.domain = 'lairen.com';
		 *
		 * var _raw = location.hash || '';
		 * if ( _raw ) {
		 * var _arg_sep = _raw.indexOf(':'), _hash = _raw.substring( 2, -1 != _arg_sep ? _arg_sep : _raw.length );
		 * if ( ! (_hash in {'pay': 1,'pay/problem': 1, 'misc/contact': 1, 'booking/ok': 1}) ) {
		 * document.write('<div class="welcome-page u-s-n" id="lairen_page"><span class="lairen-logo">来</span><p>生活为你，来人到家</p><p>Enjoy your Life</p></div>');
		 * }
		 * }
		 *
		 * Comp version:
		 * var _raw=location.hash||"";if(_raw){var _arg_sep=_raw.indexOf(":"),_hash=_raw.substring(2,-1!=_arg_sep?_arg_sep:_raw.length);!(_hash in{home_x:1})||document.write('<div class="welcome-page u-s-n" id="lairen_page"><span class="lairen-logo"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAAByCAMAAAC4A3VPAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAKUUExURUxpcf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8Nl2JAAAADbdFJOUwCQ/AwB+QTgsGD+eAUt9uv67PACHwYDyK5w0W+T27zv9CUpLpriHtJqEgeg2OiDbgnxdVY85gitS9YXxuq238A/xWNo85GWv10+7YvTD/c4Iw5R3ISSWEOqFBNVSELnZoqPlDLXelvCoyJlqEaJJw02neUhp8tKjSswcxE1nKFEC9RytVP4d/2bfGIkyfJxdr7DGB2s5BDjzCy0laRHKM1rTLj7mTfhjlD1dLeYeVp+HEBFaU/VVBZ9G4IgpspJ7s8vNLrEpYbObAqvUrndGT2AfzuibU0zwdCrV6GqefQAAATZSURBVGje7Zr1f1tHDMAd+9lz7ThxY4eZOVmDXaDNwu3CTZo0yVZYaWXmrszttjKMGcodMzMzvH9maZMtT7J9pzvH/aF9+smRTvq++1hPd1JsMOhy+4oK5Q4dqSN1pI70F3nvOIog5HiS0wofSKsaMAnSkbc88qKVIihYCMmpVq8+OvLWQ779ztrQIzt6UoWR2faj+Ul5W0tEgcretuGItrSvxZAHw0YM3/SLIRtGYzaFiyCLRi0trSLEZkaxYiJ7bRpTuQCxrFQb1JhMRiqZwFZDR3bBqN1k5Apoe5COjIOed5ORe6HtNB0ZBT3Tycg50GZUyMg+6DmNjHwR2pz0Xd4DPR8hI2OhLZ6O3AY9HyYjU6BtDh0Z8brWMamC/l4maE22DSKX6H0az50CpcARojHNFip4r446rhSqsbud/1t2WcSK7NOThv3CChWxsl4yUoDaCoJFz5Lw4tzJlYtnbhY+vFwTn0uIjIr+wVvQU7//ly0354hWfskNMR6/8bEjtOePwCMP/Tzt+vKCG390D33KK3AEEun4qWVkef710zfi5EhZC1qSEwikpWTp95r1/wypBjUvvXXRu2OKVM5Gn6uH6/8cUv8NVSfXZKW6xgIZvuWp9/K9dERnDf1mT21YdfcbyS55ZMSy+XGRZh9N2KOGQl/9WX1lY9a11RYxZHDKt5cXZ5pZfd8Zw1/sxvDZ+PNxmy71pvQzkZaKDYN1Xzx2NN3I6TPNfb2KYeCckdSUmtPPNFkXNs56C+mTqg/HJxIb28is7OHHPvZbpXoTJMbeof0KMgo/NQcSt2/BK8meWWbqWpkfGN6k/cUzfL64G6NPhI4tLrRv5gPccv9E3efxY0IzH46bn0w+LDqnxP6aaZSnTViQ9tXzOQZhyXF02U/LIQ/It7WdtDTesypmKlA8KY+cDkNvc39c89pLiFfq3u55Z86QRp6A2efyXWM7oLJIljjD6a11817W84ByhywSHTIDLCRqYz6RRH4JorSZWMh2fChKSSqMEsU8L5V0oE3MkUIGwdjN7CN6NlQXyxDvhO+auZWN/BGqm2SQtTBGNeci4iqFeocEMgaGGMe7+zRAfZo4sQbNs5fzkFuQQ7YwshxGWMO/4c1ltfsEcaOzax0fOQ8ZLP69IVXBfKTbBi3TBcvry9C9h3J1noyudIoQsgAF3khBNiPTRBGiCV2G3yc1CGUfsmZ/HClCcWtpPcl6ZJsiUOvug65HttOQy5DtGToyGrk2UjsvlEBqu+wm1VQqckBlDRwZYkeOCeT+0vICsl4lput4ZrIzW9qHVKmkPYDc7lLoyOVhyDxIIZ7CXotEZgWzkHktpQShu5paVSaCvOJUhSutew/ysYtNRHJxdxnORS7Ev44wiSEP4Y5tE494v42zSe7cZytakLiZg0zgbZKLzMDf5no2cZ3K2yR/unUBrXAyW/fgPNzrm8SRGbgrtbKQuHioWTIzvKU4yuO+iW9OwIXHIoNsrUJr5vqe7Kfhx/tAblJZh+PsJL8g30kORy0teERS4WPk8xlaaHTIjoCX4G3mekcexOsa5KfO5SrlGpSNj8lVnfLI4/U4Eb1l0H78YLv9ma3H4mjzPNe049yJ8mucHxGJf4q02iPJPkJLph7z7z8IKbgG7TLooosuutxu8i9dGLXxwhNswQAAAABJRU5ErkJggg==" ></span><p>\u751f\u6d3b\u4e3a\u4f60\uff0c\u6765\u4eba\u5230\u5bb6</p><p>Enjoy your Life</p></div>')}
		 */?>-1^location.host.indexOf('lairen.com')&&(document.domain='lairen.com');var backend_url=<?php echo ($DEV_MODE ? '""' : '""') ?>,has_member=<?php echo ($has_member ? 1 : 0) ?>,begin,lairen_asset_path='<?php echo LAIREN_ASSET_PATH; ?>',img_code_server='<?php echo $IMG_CODE_SERVER; ?>',region,tap;<?php echo $lairen_me; ?>;try{document.createEvent('TouchEvent');tap='tap';}catch(e){tap='ontouchstart'in window?'tap':'click';}tap='click';</script>
<?php /* 页面加载动画 */ ?>
	<!--<div class="spinner-box" id="spinner-box" style="display: none;"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>-->
<?php
/*<div class="spinner-box" id="spinner-box" style="display: none;">
    <i class="loading-circle">
        <i class="loading-rotate rotate">
            <i class="loading-rotate-left"></i>
            <i class="loading-rotate-right"></i>
        </i>
    </i>
</div>*/
?>

<?php /* 加载 View 超时界面 */ ?>
<?php /*<div class="load-failed"><p class="load-failed-p">加载失败...</p><div class="load-again">重试</div></div>*/?>

<?php /*loading*/?>
<?php /*<div class="load-toast"><div class="load-bg"></div><svg class="circle-process" xmlns="http://www.w3.org/2000/svg"><circle stroke-dashoffset="70%" id="circle" cx="50%" cy="50%" r="33%" stroke-width="1%"></circle></svg></div>*/?>

<?php /* Dialog */ ?>
<?php /*<div id="lairen_dialog"><div id="dialog_mask"></div></div>*/?>
<?php
///*动态生成样式*/
//if($data_tabbar){
//
//    echo '<style>',
//    '.tab-title{',
//        'color:'.$data_tabbar->color[0].';',
//    '}',
//    '.tab-box.checked .tab-title{',
//        'color:'.$data_tabbar->color[1].';',
//    '}',
//    '</style>';
//    echo '<input type="hidden" class="tabbar-data" name="" value='.json_encode($data_tabbar).'> ';
//}
//?>
<?php if ($DEV_MODE) {
/*import_js("libs/bridge/lairen.kerkee-dev-lite", $disable_cache );*/
import_js("libs/3rd/zepto/1.2.0/zepto", $disable_cache ,$native_app_present_mode);
//    import_js("libs/3rd/jquery/1.11.3/jquery", $disable_cache );
/*import_js("libs/3rd/zepto/1.2.0/touch", $disable_cache );*/
//    import_js("libs/3rd/zepto/1.2.0/fx", $disable_cache ,$native_app_present_mode);
import_js("libs/xfly/xfly-dev.0.1.46", $disable_cache ,$native_app_present_mode );

/*  Web app page model(s)  */
/* 最先使用最后定义(导入) */
import_js("base", $disable_cache ,$native_app_present_mode );
import_js("footer.nav", $disable_cache ,$native_app_present_mode );


/*时间日期*/
import_js("libs/3rd/laydate/laydate", $disable_cache ,$native_app_present_mode );
/*分页*/
import_js("libs/3rd/laypage/laypage", $disable_cache ,$native_app_present_mode );
/*弹出层*/
import_js("libs/3rd/layer/layer", $disable_cache ,$native_app_present_mode );

//    import_js("libs/3rd/form/form", $disable_cache ,$native_app_present_mode );

//    import_js("libs/geo.location", $disable_cache ,$native_app_present_mode );
//    import_js("libs/3rd/swipe/swipe.min", $disable_cache ,$native_app_present_mode );
//    import_js("libs/3rd/swipe/swiper.animate.min", $disable_cache ,$native_app_present_mode );
import_js('libs/3rd/layzr/layzr.min', $disable_cache ,$native_app_present_mode );
import_js('libs/3rd/mustache/mustache.min', $disable_cache ,$native_app_present_mode );

import_js('index/home', $disable_cache);
import_js('index/order.statistics', $disable_cache);
import_js('index/price.control', $disable_cache);
import_js('index/service.management', $disable_cache);
import_js('index/technician.salary', $disable_cache);
import_js('index/user.rank', $disable_cache);

import_js('index/reward.punishment', $disable_cache);

import_js('index/user.info', $disable_cache); //用户信息
import_js('index/sms.code', $disable_cache); //短信验证码

import_js('index/order', $disable_cache); //订单查询
import_js('index/recharge', $disable_cache); //订单查询

import_js('index/technician.info', $disable_cache); //技师信息
import_js('index/level.manage', $disable_cache); //等级管理
import_js('index/remuneration.manage', $disable_cache); //报酬管理

import_js('index/complaints', $disable_cache); //订单查询

import_js('index/qa', $disable_cache); //qa编辑
import_js('index/feedback', $disable_cache); //意见反馈

import_js('index/coupons', $disable_cache); //优惠券

import_js('index/franchisee', $disable_cache); //加盟商管理

import_js('index/example', $disable_cache); //样式示例


/*--------------------以下为统计后天新增js-------------------------*/
import_js('index/edit.map', $disable_cache); //地图编辑

import_js('transaction/summary', $disable_cache); //交易汇总
import_js('transaction/profile', $disable_cache); //交易概况
import_js('transaction/search', $disable_cache); //交易查询
import_js('transaction/statistics', $disable_cache); //交易统计


/*  Web app page model(s)  */
} else {
import_js('{{PATTERN_PROD_APP_JS}}', $disable_cache, $native_app_present_mode );
/* -------- 搜狗定制 ------------------------------ */
/*echo '<script src="//qiyukf.com/script/7befb48e50455bdb1799f26d30bf1ee3.js"></script>';*/
if ( $CUSTOMIZED_FOR_SOGOU ) {
/*echo '<script sogouid="110" type="text/javascript" charset="utf-8"  src="//fuwu.wap.sogou.com/static/partner.js"></script>';*/
}
} ?>
	<form id="form_poster"></form>
<?php
/*--------------------------------------首页模板----------------------------------------*/
//$data = json_decode( $index_model );
?>
	<div class="index-header df">
		<div class="i-h-name col-6">来人到家平台管理系统</div>

		<div class="user-message col-6 df">
			<div class="sign-out">退出</div>
			<div class="alter-password">修改密码</div>
			<div class="user-detail">
				<div>公司-部门-XXX</div>
				<div>角色：XXX</div>
			</div>
		</div>
	</div>

<?php /*顶部导航条*/ ?>
	<div class="header-nav">
		<ul class="header-nav-list">
			<li class="active">交易</li>
			<li>运营</li>
			<li>订单</li>
			<li>工单</li>
			<li>客服</li>
			<li>内控</li>
			<li>客诉</li>
			<li>财务</li>
			<li>人事</li>
			<li>权限管理</li>
		</ul>
	</div>

	<div class="main-container df">
		<div class="left-menu">
			<ul class="nav-list c-p">
				<li class="active"><a class="lai-page__nav" href="/transaction/summary">交易汇总</a></li>
				<li><a class="lai-page__nav" href="/transaction/profile">交易概况</a></li>
				<li><a class="lai-page__nav" href="/transaction/search">交易查询</a></li>
				<li><a class="lai-page__nav" href="/transaction/statistics">交易统计</a></li>
			</ul>
		</div>
	</div>

<?php if(!$native_app_present_mode) { ?>
<script defer>
	<?php
		/* TOUR_VERSION */
		// 设置默认界面, 如果当前 url 不包含有效的 hash 则加该 page,
		// 如：http://larien.com/m 会使用 http://lairen.com/m/#!ui.demo 呈现 view page
		?>$.ajaxSettings['cache']=!1;$Page.config({home:"home",onAfterPageChange:function(older,currently){if(currently&&!currently.hasContent()){showloading()}},onCurrentPageContentLoaded:function(){hideloading()}});
	<?php /* 支付面板(用于预约支付)
var payment_pan = lairen.init_actionSheet('payment_pan');
 */ ?>
	<?php
	/**
	 * ######### 注意 #########
	 * 1: 先定义         $Page.define( 'page id', {page 相关配置数据} )
	 * 2: 然后才能前往    $Page.go( '指定的 page id' )
	 * 3: 填充 page 内容，在 onCreateView() 中调用 this.render('你的 html 片段')
	 * 4: 如想后退，先调用 $Page.canBack() 是否返回 true, 再调用 $Page.back()
	 */ ?>
    $Page.bootstrap( 'home' );
	<?php /*tabbarJson数据*/ ?>
    var tabbar = $('.tabbar-data').val();
	<?php /*延迟预加载 AMap 资源 */ ?>
    //import_style('//cache.amap.com/lbs/static/main.css?v=1.0', 0);import_script('//webapi.amap.com/maps?v=1.3&key=122785b779e5f964a60372170f96d869', 0);
	/*import_style('//cache.amap.com/lbs/static/es5.min.js', 0);*//*import_script('////cache.amap.com/lbs/static/addToolbar.js', 0);*/
	<?php /* 欢迎页延迟 4 秒消失 */ ?>
    //setTimeout(function(){var lairen_page=document.getElementById("lairen_page");lairen_page&&(lairen_page.style.display="none")},4e3);
	<?php /*支付方式根据环境变更 */ ?>
    //if(lairen.browser.wechat){/*init_wechat_share();*/}var _hmt=_hmt||[];import_script('//hm.baidu.com/hm.js?d63b83f4fab54814e92328e4aa687524',6e3);
	<?php if ( $DEV_MODE ) { ?>
	/* Swipe to refresh */
    var opts = {
        maxTime: 1000,
        onBegin: function(){

        },
        onEnd: function(){
        }
    };
    //mRefresh( opts );
	<?php } ?></script><?php } ?></body></html>