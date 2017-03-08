$(function(){
	var head = $(`
		<header class="top-nav">
		<div class="top-nav-inner">
			<div class="nav-header">
				<button type="button" class="navbar-toggle pull-left sidebar-toggle">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand"><img src="images/logo-new.png"></a>
			</div>
			<div class="nav-container">
				<a  class="index-tex"><span class="img-top_shop "></span><span>商品</span></a>
				<a  class="index-tex"><span class="img-top_order "></span><span>订单</span></a>
				<a  class="index-tex"><span class="img-top_run"></span><span>运营</span></a>
				<a  class="index-tex"><span class="img-top_data "></span><span>数据</span></a>
				<a  class="index-tex"><span class="img-top_set "></span><span>设置</span></a>
				<ul class="nav navbar-nav">
					<li class="dropdown">
						<a tabindex="0"  href="" data-toggle="dropdown" data-hover="dropdown" data-submenu="" aria-expanded="false">菜单<span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li>
								<a>左导航</a>
							</li>
							<li>
								<a href="功能按钮.html">功能按钮</a>
							</li>
							<li>
								<a href="模态框.html">模态框</a>
							</li>
							<li>
								<a href="搜索栏.html">搜索栏</a>
							</li>
							<li>
								<a href="tab.html">tab</a>
							</li>
							<li>
								<a>表</a>
							</li>
							<li>
								<a>表2</a>
							</li>
							<li>
								<a href="左边侧边栏1.html">左边侧边栏1</a>
							</li>
						</ul>
					</li>
				</ul>

				<div class="pull-right m-right-sm">
					<!--右上角的用户菜单-->
					<!--   右边三个按钮 -->
					<!--第一个bell-->
					<div class="user-block hidden-xs ">
						<a href="#" id="userToggle" data-toggle="dropdown">
							<div class="user-detail inline-block">
								<span class="img-top_bell"></span>
								<span class="badge badge-danger">8</span>
							</div>
						</a>
						<div class="panel border dropdown-menu user-panel">
							<div class="panel-body paddingTB-sm">
								<ul class="bell-box">
									<li>
										<a id="my_account" href="#">
											<span class="m-left-xs">待发货订单</span>
										  <span class="m-left-xs">6</span>
										</a>
										<a  href="#">
										   <span class="m-left-xs">待易登抓取订单</span>
											<span class="m-left-xs">2</span>
										</a>

									</li>
									<li>
										<a href="#">
											<span class="m-left-xs">商品库存预警</span>
											<span class="m-left-xs"></span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<!--第二个computer-->
					<div class="user-block hidden-xs ">
						<a href="#"  data-toggle="dropdown">
							<div class="user-detail inline-block">
								<span class="img-top_computer"></span>
							</div>
						</a>
						<div class="panel border dropdown-menu user-panel">
							<div class="panel-body paddingTB-sm">
								<ul>
									<li>
										<a  href="#">
											<span class="m-left-xs">待发货订单</span>
										</a>
										<a  href="#">
											<span class="m-left-xs">待易登抓取订单</span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<!--第三个out-->
					<ul class="nav-notification" style="right: 108px;"><!--通知按钮-->
						<li>
							<a href="#" data-toggle="dropdown" class="note_img change-topimg">
								<span class="img-top_out"></span>
							</a>
						</li>
					</ul><!--通知按钮-->
				</div><!--pull-right m-right-sm-->

			</div><!--nav-container-->
		</div><!--top-nav-inner-->
	</header>
	`);
	head.insertAfter($('.wrapper'));
});