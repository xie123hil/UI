/**
 * @author bh-lay
 * 
 * @github https://github.com/bh-lay/UI
 * @modified 2014-7-6 8:18
 * 
 **/

(function(global,doc,UI_factory,utils_factory){
	
	//初始化工具类
	var utils = utils_factory(global,doc);
	
	//初始化UI模块
	var UI = UI_factory(global,doc,utils);
	
	//提供window.UI的接口
	global.UI = global.UI || UI;
	global.UI._utils = utils;
	
	//提供CommonJS规范的接口
	global.define && define(function(){
		return UI;
	});
})(window,document,function(window,document,utils){
	/**
	 * base template
	 */
	var allCnt_tpl = '<div class="UI_lawyer"><div class="UI_mask"></div><div class="UI_main_cnt"></div><div class="UI_fixedScreenTop_cnt"></div><div class="UI_fixedScreenBottom_cnt"></div></div>';
	var dragMask_tpl = '<div style="position:absolute;top:0px;left:0px;z-index:100000;cursor:default;"></div>';
	var pop_tpl = '<div class="UI_pop"><div class="UI_pop_cpt"></div><div class="UI_pop_cnt"></div><a href="javascript:void(0)" class="UI_pop_close" title="\u5173\u95ED">×</a></div>';
	var confirm_tpl = '<div class="UI_confirm"><div class="UI_confirm_text">{text}</div></div>';
	var ask_tpl = '<div class="UI_ask"><div class="UI_ask_text">{text}</div><input class="UI_ask_key" type="text" name="UI_ask_key"/></div>';
	var confirmBar_tpl = '<div class="UI_pop_confirm"><a href="javascript:void(0)" class="UI_pop_confirm_ok">{confirm}</a><a href="javascript:void(0)" class="UI_pop_confirm_cancel">{cancel}</a></div>';
	var plane_tpl = '<div class="UI_plane"></div>';
	var prompt_tpl = '<div class="UI_prompt"><div class="UI_cnt"></div></div>';
	var cover_tpl = '<div class="UI_cover"><div class="UI_coverCnt"></div><a href="javascript:void(0)" class="UI_coverClose">〉</a></div>';
	var select_tpl = '<div class="UI_select"><div class="UI_select_body"> {caption} <div class="UI_selectCnt">{list}</div></div><div class="UI_selectCancel"><a class="UI_select_btn" href="javascript:void(0)" data-index="-1">取消</a></div></div>';
	
	var popCSS = '.UI_lawyer{position:absolute;top:0px;left:0px;z-index:4999;width:100%;height:0px;overflow:visible;font-family:"Microsoft Yahei"}.UI_lawyer a,.UI_lawyer a:hover{text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-tap-highlight-color:transparent;}.UI_lawyer a:active{outline:none;}.UI_mask{position:absolute;top:0px;left:0px;width:100%;background-color:#000;display:none;opacity:0.2;filter:alpha(opacity=20)}.UI_main_cnt{width:0px;height:0px;overflow:visible;}.UI_fixedScreenTop_cnt{position:absolute;z-index:4999;top:0px;left:0px;width:100%;height:0px;overflow:visible;}.UI_fixedScreenBottom_cnt{position:absolute;z-index:4999;left:0px;width:100%;height:0px;overflow:visible;}.UI_pop{width:200px;_border:1px solid #eee;position:absolute;top:400px;left:300px;background:#fff;border-radius:4px;overflow:hidden;box-shadow:2px 3px 10px rgba(0,0,0,0.6);}.UI_pop_cpt{position:relative;height:36px;line-height:36px;overflow:hidden;border-bottom:1px solid #ebebeb;color:#777;font-size:16px;text-indent:15px;cursor:default;}.UI_pop_cnt{position:relative;min-height:100px;overflow:auto;width:100%;}.UI_pop_close{display:block;position:absolute;top:0px;right:0px;width:40px;height:36px;text-align:center;line-height:36px;color:#ddd;font-family:"Simsun";font-size:20px;font-weight:bold;text-decoration:none;transition:0.1s;}.UI_pop_close:hover{color:#888;text-decoration:none;}.UI_pop_close:active{color:#222}.UI_confirm{_border:1px solid #eee;position:absolute;background:#fff;border-radius:4px;overflow:hidden;box-shadow:2px 3px 10px rgba(0,0,0,0.6);}.UI_confirm_text{padding:30px 10px 20px;line-height:26px;text-align:center;font-size:20px;color:#333;}.UI_ask{_border:1px solid #eee;position:absolute;background:#fff;border-radius:4px;overflow:hidden;box-shadow:2px 3px 10px rgba(0,0,0,0.6);}.UI_ask_text{padding:25px 10px 15px;line-height:26px;text-align:center;font-size:18px;color:#333;}.UI_ask input{display:block;margin:0px auto 15px;height:30px;padding:4px 4px;line-height:22px;box-sizing:border-box;width:90%;}.UI_pop_confirm{overflow:hidden;text-align:center;border-top:1px solid #ddd;}.UI_pop_confirm a{display:block;width:50%;height:36px;float:left;font-size:14px;line-height:36px;color:#03f;box-sizing:border-box;transition: 0.15s;}.UI_pop_confirm_ok{border-right:1px solid #ddd;}@media(min-width:460px){.UI_pop_confirm a:hover{background : #eee}}.UI_plane{width:200px;position:absolute;top:400px;left:300px;}.UI_prompt{width:240px;position:absolute;left:50%;margin-left:-120px;box-sizing:content-box;background:#fff;_border:1px solid #fafafa;border-radius:4px;box-shadow:2px 2px 10px rgba(0,0,0,0.5);}.UI_cnt{padding:30px 10px;font-size:18px;color:#222;text-align:center;}.UI_cover{position:absolute;top:0px;left:0px;width:100%;height:100px;}.UI_coverCnt{position:relative;width:100%;height:100%;background:#fff;overflow:auto}.UI_coverClose{display:block;position:absolute;top:50%;left:0px;width:20px;height:60px;padding-left:5px;text-align:center;line-height:60px;color:#ddd;font-family:"Simsun";font-size:30px;background:#555;}.UI_coverClose:hover{background-color:#333;color:#fff;text-decoration:none;}.UI_select{position:absolute;width:100%;padding-bottom:10px;}.UI_select a{display:block;height:40px;line-height:40px;text-align:center;color:#03f;font-size:16px;}.UI_select_body{margin:0px 10px 10px;border-radius:8px;overflow:hidden;background:#fff;}.UI_selectCpt{padding:8px 0px;}.UI_selectCpt h3,.UI_selectCpt p{margin:0px;font-size:15px;line-height:18px;text-align:center;color:#aaa;font-weight:normal;}.UI_selectCpt p{font-size:12px;}.UI_selectCnt a{border-top:1px solid #eee;}.UI_selectCancel{margin:0px 10px;border-radius:8px;overflow:hidden;background:#fff;}.UI_main_cnt .UI_select{width: 200px;padding: 0px;border-radius: 0px;box-shadow: 2px 1px 5px rgba(0,0,0,0.8)}.UI_main_cnt .UI_select_body,.UI_main_cnt .UI_selectCancel{margin: 0px;border-radius: 0px;}.UI_main_cnt .UI_select a{height: 30px;line-height: 30px;font-size: 14px;}.UI_main_cnt .UI_selectCancel{border-top:1px solid #eee;background: #eee}';
	
	var isIE67 = false;
	if(navigator.appName == "Microsoft Internet Explorer"){
		var version = navigator.appVersion.split(";")[1].replace(/[ ]/g,"");
		if(version == "MSIE6.0" || version == "MSIE7.0"){
			isIE67 = true; 
		}
	}
	
	/**
	 * 定义私有变量
	 * 
	 **/ 
	var private_allCnt = utils.createDom(allCnt_tpl)[0],
		private_maskDom = utils.findByClassName(private_allCnt,'UI_mask')[0],
		private_mainDom = utils.findByClassName(private_allCnt,'UI_main_cnt')[0],
		private_fixedScreenTopDom = utils.findByClassName(private_allCnt,'UI_fixedScreenTop_cnt')[0],
		private_fixedScreenBottomDom = utils.findByClassName(private_allCnt,'UI_fixedScreenBottom_cnt')[0],
		private_cssDom = null,
		private_head = document.head || document.getElementsByTagName('head')[0],
		private_docW,
		private_winH,
		private_docH,
		private_scrollTop,
		private_isSupportTouch = "ontouchend" in document ? true : false,
		private_maskCount = 0;

	var private_CONFIG = {
		'gap' : {
			'top' : 0,
			'left' : 0,
			'bottom' : 0,
			'right' : 0
		},
		'zIndex' : 499
	};
	
	var bodyDom;
	if (document.compatMode == "BackCompat") {
		bodyDom = document.body;
	}else{
		//document.compatMode == \"CSS1Compat\" 
		bodyDom = document.documentElement;
	}
	function refreshSize(){
		//重新计算窗口尺寸
		private_scrollTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
		private_winH = window.innerHeight || document.documentElement.clientHeight;
		private_docH = bodyDom.scrollHeight;
		private_docW = bodyDom.clientWidth;
		
		//向css环境写入动态css
		private_cssDom && utils.removeNode(private_cssDom);
		var styleStr = [
			'.UI_cover{height:' + private_winH + 'px;}',
			'.UI_ask{top:' + (private_winH/2) + 'px;}',
			'.UI_mask{height:' + private_docH + 'px;}'
		].join('');
		private_cssDom = utils.createStyleSheet(styleStr,{'data-module' : "UI_plug"});
		private_head.appendChild(private_cssDom);
	}
	
	
	utils.ready(function(){
		var styleSheet = utils.createStyleSheet(popCSS,{'data-module' : "UI"});
		private_head.appendChild(styleSheet);
		
		document.body.appendChild(private_allCnt);
		//释放掉无用的内存
		popCSS = null;
		allCnt = null;
		
		//更新窗口尺寸
		refreshSize();
		setTimeout(refreshSize,500);
		var rebuild_fn = null;
		/**
		 *	fix Prompt Mask position & size 
		 */ 
		if(isIE67){
			utils.css(private_fixedScreenTopDom,{'top' : private_scrollTop});
			utils.css(private_fixedScreenBottomDom,{'top' : private_scrollTop + private_winH});
			
			rebuild_fn = function(){
				refreshSize();
				utils.css(private_fixedScreenTopDom,{'top' : private_scrollTop});
				utils.css(private_fixedScreenBottomDom,{'top' : private_scrollTop + private_winH});
				utils.css(private_maskDom,{'top' : private_scrollTop});
			};
		}else{
			utils.css(private_fixedScreenTopDom,{
				'position' : 'fixed',
				'top' : 0
			});
			utils.css(private_fixedScreenBottomDom,{
				'position' : 'fixed',
				'bottom' : 0
			});
			rebuild_fn = refreshSize;
		}
		//监听浏览器缩放、滚屏事件
		utils.bind(window,'resize',rebuild_fn);
		utils.bind(window,'scroll',rebuild_fn);
	});
	
	
	//通用限制位置区域的方法
	function fix_position(top,left,width,height){
		var gap = private_CONFIG.gap;
		if(top<private_scrollTop + gap.top){
			//Beyond the screen(top)
			top = private_scrollTop  + gap.top;
		}else if(top + height - private_scrollTop > private_winH - gap.bottom) {
			//Beyond the screen(bottom)
			if(height > private_winH - gap.top - gap.bottom){
				//Is higher than the screen
				top = private_scrollTop + gap.top;
			}else{
				//Is shorter than the screen
				top = private_scrollTop + private_winH - height - gap.bottom;
			}
		}
		if(left < gap.left){
			left =  gap.left;
		}else if(left + width > private_docW - gap.right){
			left = private_docW - width - gap.right;
		}
		
		return {
			'top' : top,
			'left' : left
		}
	}
	//计算自适应页面位置的方法
	function adaption(width,height){
		var top = (private_winH - height)/2 + private_scrollTop;
		var left = (private_docW - width)/2;
		
		var gap = private_CONFIG.gap;
		var screenTop = (private_winH - height)/2;
		if(screenTop<gap.top){
			screenTop = gap.top;
		}
		
		var newPosition = fix_position(top,left,width,height);
		return {
			'top' : newPosition.top,
			'left' : newPosition.left,
			'screenTop' : screenTop,
			'screenLeft' : newPosition.left
		}
	}
	
	//增加确认方法
	function add_confirm(dom,param,close){
		var callback = null;
		var cancel = null;
		var btns = ['\u786E\u8BA4','\u53D6\u6D88'];
		if(typeof(param) == "function"){
			callback = param;
		}else if(typeof(param) == "object"){
			if(param['btns']){
				btns[0] = param['btns'][0];
				btns[1] = param['btns'][1];
			}
			if(typeof(param['callback']) == "function"){
				callback = param['callback'];
			}
			if(typeof(param['cancel']) == "function"){
				cancel = param['cancel'];
			}
		}
		var this_html = confirmBar_tpl.replace(/{(\w+)}/g,function(){
			var key = arguments[1];
			if(key == 'confirm'){
				return btns[0]
			}else if(key == 'cancel'){
				return btns[1]
			}
		});
		dom.appendChild(utils.createDom(this_html)[0]);
		
		
		utils.bind(dom,'click','.UI_pop_confirm_ok',function(){
			//点击确认按钮,根据执行结果判断是否要关闭弹框
			callback ? ((callback() != false) && close()) : close();
		})('click','.UI_pop_confirm_cancel',function(){
			//点击取消按钮,根据执行结果判断是否要关闭弹框
			cancel ? ((cancel() != false) && close()) : close();
		});
	}
	
	/**
	 * 显示蒙层 
	 */
	function showMask(){
		private_maskCount++
		if(private_maskCount==1){
			utils.fadeIn(private_maskDom,100);
		}
	}
	/**
	 * 可定制关闭方法
	 *  
	 */
	function CLOSEMETHOD(effect_define,time_define){
		var default_effect = effect_define || null;
		var default_time = time_define;
		
		return function(effect,time){
			effect = effect || default_effect;
			time = parseInt(time || default_time) || 80;
			
			//处理关闭回调、蒙层
			this.closeFn && this.closeFn();
			if(this._mask){
				private_maskCount--
				if(private_maskCount==0){
					utils.fadeOut(private_maskDom,80);
				}
			}
			
			var DOM = this.dom;
			if(!effect){
				utils.removeNode(DOM);
			}else{
				if(effect == 'fade'){
					utils.fadeOut(DOM,time,function(){
						utils.removeNode(DOM);
					});
				}else if(effect == 'slide'){
					utils.slideUp(DOM,time,function(){
						utils.removeNode(DOM);
					});
				}else if(effect == 'zoomOut'){
					utils.zoomOut(DOM,time,function(){
						utils.removeNode(DOM);
					});
				}
			}
		}
	}
	var animDom = utils.createDom('<div style="position:absolute;background:#fff;"></div>')[0];
	
	//入场
	function opening(DOM,cssEnd,fromDom,time,tween,fn){
		var normalHeight = cssEnd.height || utils.getStyle(DOM,'height');
		utils.hide(DOM);
		var cssStart = {
			'width' : cssEnd.width,
			'height' : cssEnd.height,
			'left' : cssEnd.left,
			'top' : (cssEnd.top ? cssEnd.top - 100 : null),
			'opacity' : 0
		};
		if(fromDom){
			tween = 'SineEaseIn';
			time = 200;
			var offset = utils.offset(fromDom);
			cssStart.top = offset.top;
			cssStart.left = offset.left;
			cssStart.height = utils.getStyle(fromDom,'height');
			cssStart.width = utils.getStyle(fromDom,'width');
			cssStart.opacity = 0.5;
		}
		//放置于初始位置
		private_mainDom.appendChild(animDom);
		utils.css(animDom,cssStart);
		//动画开始
		utils.animation(animDom,{
			'width' : cssEnd.width,
			'height' : normalHeight,
			'left' : cssEnd.left,
			'top' : cssEnd.top,
			'opacity' : 1
		},time,tween,function(){
			utils.removeNode(animDom);
			cssEnd.display = 'block';
			utils.css(DOM,cssEnd);
			fn && fn();
		});
	}
	/**
	 * 弹框
	 * pop 
	 */
	function POP(param){
		var param = param || {};
		var this_pop = this;
		
		this.dom = utils.createDom(pop_tpl)[0];
		this.cntDom = utils.findByClassName(this.dom,'UI_pop_cnt')[0];
		this.closeFn = param['closeFn'] || null;
		this._mask = param['mask'] || false;

		var this_html = param['html'] || '';
		var this_width = param['width'] || Math.min(600,private_docW-20);


		//当有确认参数时
		if(param['confirm']){
			add_confirm(this.dom,param['confirm'],function(){
				this_pop.close();
			});
		}
		//处理title参数
		var caption_dom = utils.findByClassName(this.dom,'UI_pop_cpt')[0];
		if(!param['title']){
			utils.removeNode(caption_dom);
		}else{
			var title = param['title'] || '\u8BF7\u8F93\u5165\u6807\u9898';
			
			caption_dom.innerHTML = title;
			//can drag is pop
			var dragMask = null;
			utils.drag(caption_dom,this.dom,{
				'start' : function(){
					//更新窗口尺寸
					refreshSize();
					
					dragMask = utils.createDom(dragMask_tpl)[0];
					utils.css(dragMask,{
						'width' : private_docW,
						'height' : private_winH,
						'cursor' : utils.getStyle(caption_dom,'cursor')
					});
					private_fixedScreenTopDom.appendChild(dragMask);
				},
				'move' : function(mx,my,l_start,t_start,w_start,h_start){
					var left = mx + l_start;
					var top = my + t_start;
					
					var newSize = fix_position(top,left,w_start,h_start);
					utils.css(this_pop.dom,{
						'left' : newSize.left,
						'top' : newSize.top
					});
				},
				'end' : function (){
					dragMask && utils.removeNode(dragMask);
					dragMask = null;
				}
			});
		}


		//insert html
		this.cntDom.innerHTML = this_html;
		private_mainDom.appendChild(this.dom);
		
		
		//fix position get size
		var fixSize = adaption(this_width,utils.outerHeight(this.dom));
		var top = (param['top'] == +param['top']) ? param['top'] : fixSize.top;
		var left = (param['left'] == +param['left']) ? param['left'] : fixSize.left;
		
		opening(this.dom,{
			'width' : this_width,
			'top' : top,
			'left' : left
		},param.anim_from,200,'QuadEaseIn');
		
		utils.bind(this.dom,'click','.UI_pop_close',function(){
			this_pop.close();
		});
		
		if(this._mask){
			showMask();
		}
		
	}
	//使用close方法
	POP.prototype['close'] = CLOSEMETHOD('zoomOut',150);
	POP.prototype['adapt'] = function(){
		var width = utils.outerWidth(this.dom);
		var height = utils.outerHeight(this.dom);
		
		var fixSize = adaption(width,height);
		utils.animation(this.dom,{
			'top' : fixSize.top,
			'left' : fixSize.left
		}, 100);
	};

	/**
	 * CONFIRM 
	 */
	function CONFIRM(param){
		var param = param || {};
		var this_pop = this;

		var this_text = param['text'] || '\u8BF7\u8F93\u5165\u786E\u8BA4\u4FE1\u606F！';
		var callback = param['callback'] || null;
		var this_html = confirm_tpl.replace(/{text}/,this_text);
		this._mask = typeof(param['mask']) == 'boolean' ? param['mask'] : true;
		this.dom = utils.createDom(this_html)[0];
		this.closeFn = param['closeFn'] || null;
		
		//显示蒙层
		if(this._mask){
			showMask();
		}
		
		add_confirm(this.dom,param,function(){
			this_pop.close();
		});
		var newPosition = adaption(300,160);
		// create pop
		
		
		
		private_fixedScreenTopDom.appendChild(this.dom);
		opening(this.dom,{
			'width' : 300,
			'left' : newPosition.screenLeft,
			'top' : newPosition.top - 100
		},param.anim_from,100,'BackEaseOut',function(){
			utils.css(this_pop.dom,{
				'top' : newPosition.screenTop - 100
			});
		});

	}
	CONFIRM.prototype['close'] = CLOSEMETHOD('fade');


	/**
	 * ASK 
	 */
	function ASK(text,callback,param){
		var this_pop = this;
		var param = param || {};
		var this_text = text || '\u8BF7\u8F93\u5165\u786E\u8BA4\u4FE1\u606F！';
		var this_html = ask_tpl.replace(/{text}/,this_text);

		this.dom = utils.createDom(this_html)[0];
		this.inputDom = utils.findByClassName(this_pop.dom,'UI_ask_key')[0];
		this.closeFn =  null;
		this.callback = callback || null;

		var this_html = confirmBar_tpl.replace(/{(\w+)}/g,function(a,key){
			if(key == 'confirm'){
				return '确定';
			}else if(key == 'cancel'){
				return '取消';
			}
		});
		this.dom.appendChild(utils.createDom(this_html)[0]);
		
		//确定
		utils.bind(this.dom,'click','.UI_pop_confirm_ok',function(){
			var value = this_pop.inputDom.value;
			if(this_pop.callback){
				//根据执行结果判断是否要关闭弹框
				var result = this_pop.callback(value);
				if(result != false){
					this_pop.close();
				}
			}else{
				this_pop.close();
			}
		})('click','.UI_pop_confirm_cancel',function(){
			//取消
			this_pop.close();
		});

		var newPosition = adaption(300,160);

		private_fixedScreenTopDom.appendChild(this.dom);
		
		opening(this.dom,{
			'width' : 300,
			'left' : newPosition.screenLeft,
			'top' : private_scrollTop + private_winH/2 - 100
		},param.anim_from,100,'BackEaseOut',function(){
			utils.css(this_pop.dom,{
				'marginTop' : -100,
				'top' : ''
			});
		});
	}
	ASK.prototype['close'] = CLOSEMETHOD('fade');
	ASK.prototype['setValue'] = function(text){
		var text = text ? text.toString() : '';
		this.inputDom.value = text;
	};


	/**
	 * prompt
	 * 
	 **/
	function prompt(txt,time){
		var this_prompt = this;
		var txt = txt || '\u8BF7\u8F93\u5165\u5185\u5BB9';
		this.dom = utils.createDom(prompt_tpl)[0];

		this.tips(txt,time);
		
		var newPosition = adaption(260,100);
		// create pop
		
		utils.css(this.dom,{
			'top' : 0,
			'opacity' : 0
		});
		utils.animation(this.dom,{
			'top' : newPosition.screenTop,
			'opacity' : 1
		},140,'BackEaseOut');
		
		private_fixedScreenTopDom.appendChild(this.dom);
	}
	prompt.prototype['close'] = CLOSEMETHOD('zoomOut',150);
	prompt.prototype['tips'] = function(txt,time){
		var this_prompt = this;
		if(txt){
			utils.findByClassName(this.dom,'UI_cnt')[0].innerHTML = txt;
		}
		if(time == 0){
			return
		}
		setTimeout(function(){
			this_prompt.close();
		},(time || 1500));
	};

	/**
	 *	PLANE 
	 */
	//the active plane
	private_activePlane = [];
	
	function closePlane(){
		for(var i=0,total=private_activePlane.length;i<total;i++){
			private_activePlane[i].close();
		}
		private_activePlane = [];
	}
	/**
	 * 简单的事件委托模型 
	 */
	function checkClick(event) {
		setTimeout(function(){
			var target = event.srcElement || event.target;
			while (!utils.hasClass(target,'UI_plane')) {
				target = target.parentNode;
				if(!target){
					//close the active plane
					closePlane();
					break
				}
			}
		});
	}

	utils.bind(document,'mouseup',checkClick);
	
	
	function PLANE(param){
		var this_plane = this;
		
		setTimeout(function(){
			private_activePlane.push(this_plane);
		},20);
		

		var param = param || {};

		var this_html = param['html'] || '';
		this.closeFn = param['closeFn'] || null;

		this.dom = utils.createDom(plane_tpl)[0];

		//insert html
		this.dom.innerHTML = this_html;
		
		utils.css(this.dom,{
			'width' : param['width'] || 240,
			'height' :param['height'] || null,
			'top' : param['top'] || 300,
			'left' : param['left'] || 800
		});
		private_mainDom.appendChild(this.dom);
	}
	PLANE.prototype['close'] = CLOSEMETHOD('fade',200);


	/***
	 * 全屏弹框
	 * COVER 
	 */
	function COVER(param){
		var param = param || {};
		var me = this;
		this.dom = utils.createDom(cover_tpl)[0];
		this.cntDom = utils.findByClassName(this.dom,'UI_coverCnt')[0];
		this.closeFn = param['closeFn'] || null;

		var this_html = param['html'] || '';
		//insert html
		this.cntDom.innerHTML = this_html;
		
		utils.bind(this.dom,'click','.UI_coverClose',function(){
			me.close();
		});

				
		private_fixedScreenTopDom.appendChild(this.dom);
		//记录body的scrollY设置
		this._bodyOverflowY = utils.getStyle(document.body,'overflowY');
		
		opening(this.dom,{
			'width' : private_docW,
			'top' : private_scrollTop,
			'left' : 0
		},param.anim_from,200,'QuadEaseIn',function(){
			utils.css(document.body,{
				'overflowY' : 'hidden'
			});
			utils.css(me.dom,{
				'width' : '',
				'top' : 0
			});
		});
	}
	//使用close方法
	COVER.prototype['close'] = function(){
		var me = this;
		
		utils.css(document.body,{
			'overflowY' : me._bodyOverflowY
		});
		utils.css(this.cntDom,{
			'overflowY' : 'hidden'
		});
		utils.zoomOut(this.cntDom,400, function(){
			utils.removeNode(me.dom);
		});
	};

	/**
	 * 选择功能
	 */
	function SELECT(list,param){
		var this_sel = this;
		
		var list = list || [];
		var param = param || {};
		
		var caption_html = '';
		if(param.title){
			caption_html += '<div class="UI_selectCpt">';
			if(param.title){
				caption_html += '<h3>' + param.title + '</h3>';
			}
			if(param.intro){
				caption_html += '<p>' + param.intro + '</p>';
			}
			caption_html += '</div>';
		}
		
		var fns = [];
		var list_html = '';
		for(var i=0,total=list.length;i<total;i++){
			list_html += '<a class="UI_select_btn" href="javascript:void(0)">' + list[i][0] + '</a>';
			fns.push(list[i][1]);
		}
		var this_html = select_tpl.replace(/\{(\w+)\}/g,function(a,b){
			if(b == 'list'){
				return list_html;
			}else if(b == 'caption'){
				return caption_html;
			}
		});
		
		this.dom = utils.createDom(this_html)[0];
		this._mask = true;
		this.closeFn = param.closeFn || null;
		
		if(private_docW > 460){
			this._mask = false;
			new PLANE({
				'top' : param.top || 100,
				'left' : param.left || 100,
				'width' : param.width || 200,
				'height' : 0,
				'closeFn' : function(){
					this_sel.close();
				}
			}).dom.appendChild(this.dom);
			utils.css(this.dom,{
				'position' : 'relative',
				'width' : '100%'
			});
		} else {
			utils.css(this.dom,{
				'bottom' : -100,
				'opacity' : 0
			});
			
			private_fixedScreenBottomDom.appendChild(this.dom);
			
			utils.animation(this.dom, {
				'bottom' : 0,
				'opacity' : 1
			}, 300, 'ElasticEaseOut');
		}
		
		//显示蒙层
		if(this._mask){
			showMask();
		}
		var btns = utils.findByClassName(this.dom,'UI_select_btn');
		for(var i=0,total=btns.length;i<total;i++){
			(function(index){
				utils.bind(btns[index],'click',function(){
					fns[index] && fns[index]();
					this_sel.close();
				});
			})(i);
		}
	}
	SELECT.prototype['close'] = CLOSEMETHOD('slide',200);
	/**
	 *  抛出对外接口
	 */
	return {
		'pop' : function(){
			return new POP(arguments[0]);
		},
		'config' : {
			'gap' : function(name,value){
				if(name && name.match(/(top|right|bottom|left)/)){
					if(parseInt(value)){
						private_CONFIG.gap[name] = value;
					}
				}
			},
			'zIndex' : function(num){
				var num = parseInt(num);
				if(num > 0){
					private_CONFIG.zIndex = num;
					utils.css(private_allCnt,{
						'zIndex':num
					});
					utils.css(private_fixedScreenBottomDom,{
						'zIndex':num
					});
					utils.css(private_fixedScreenTopDom,{
						'zIndex':num
					});
				}
			}
		},
		'confirm' : function(){
			return new CONFIRM(arguments[0]);
		},
		'ask' : function(text,callback,param){
			return new ASK(text,callback,param);
		},
		'prompt' : function(txt,time){
			return new prompt(txt,time);
		},
		'plane' : function(){
			return new PLANE(arguments[0]);
		},
		'cover' : function(){
			return new COVER(arguments[0]);
		},
		'select' : function(){
			return new SELECT(arguments[0],arguments[1]);
		}
	};
},function (window,document) {
	//判断是否支持css属性
	var supports = (function() {
		var div = document.createElement('div'),
			vendors = 'Khtml,Ms,O,Moz,Webkit'.split(' '),
			len = vendors.length;
		
		return function(prop) {
			if ( prop in div.style ){
				return true;
			}

			prop = prop.replace(/^[a-z]/, function(val) {
				return val.toUpperCase();
			});
	
			for(var i = 0; i<len; i++){
				if ( vendors[len] + prop in div.style ) {
					// browser supports box-shadow. Do what you need.
					// Or use a bang (!) to test if the browser doesn't.
					break 
					return true;
				}
			}
			return false;
		};
	})();
	
	
	var private_css3 = (supports('-webkit-transition') && supports('-webkit-transform')) ? true : false;
	
    var Tween = {
		Linear: function (t, b, c, d) { return c * t / d + b; },
		QuadEaseIn: function (t, b, c, d) {
			return c * (t /= d) * t + b;
		},
		QuadEaseOut: function (t, b, c, d) {
			return -c * (t /= d) * (t - 2) + b;
		},
		QuadEaseInOut: function (t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t + b;
			return -c / 2 * ((--t) * (t - 2) - 1) + b;
		},
		CubicEaseIn: function (t, b, c, d) {
			return c * (t /= d) * t * t + b;
		},
		CubicEaseOut: function (t, b, c, d) {
			return c * ((t = t / d - 1) * t * t + 1) + b;
		},
		CubicEaseInOut: function (t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		},
		QuartEaseIn: function (t, b, c, d) {
			return c * (t /= d) * t * t * t + b;
		},
		QuartEaseOut: function (t, b, c, d) {
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		},
		QuartEaseInOut: function (t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		},
		QuintEaseIn: function (t, b, c, d) {
			return c * (t /= d) * t * t * t * t + b;
		},
		QuintEaseOut: function (t, b, c, d) {
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		QuintEaseInOut: function (t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		},
		SineEaseIn: function (t, b, c, d) {
			return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
		},
		SineEaseOut: function (t, b, c, d) {
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
		},
		SineEaseInOut: function (t, b, c, d) {
			return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
		},
		ExpoEaseIn: function (t, b, c, d) {
			return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
		},
		ExpoEaseOut: function (t, b, c, d) {
			return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		},
		ExpoEaseInOut: function (t, b, c, d) {
			if (t == 0) return b;
			if (t == d) return b + c;
			if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		CircEaseIn: function (t, b, c, d) {
			return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		},
		CircEaseOut: function (t, b, c, d) {
			return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
		},
		CircEaseInOut: function (t, b, c, d) {
			if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		},
		ElasticEaseIn: function (t, b, c, d, a, p) {
			if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
			if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
			else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		ElasticEaseOut: function (t, b, c, d, a, p) {
			if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
			if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
			else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
		},
		ElasticEaseInOut: function (t, b, c, d, a, p) {
			if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (.3 * 1.5);
			if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
			else var s = p / (2 * Math.PI) * Math.asin(c / a);
			if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
		},
		BackEaseIn: function (t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		BackEaseOut: function (t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		BackEaseInOut: function (t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
		},
		BounceEaseIn: function (t, b, c, d) {
			return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
		},
		BounceEaseOut: function (t, b, c, d) {
			if ((t /= d) < (1 / 2.75)) {
				return c * (7.5625 * t * t) + b;
			} else if (t < (2 / 2.75)) {
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
			} else if (t < (2.5 / 2.75)) {
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
			} else {
				return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
			}
		},
		BounceEaseInOut: function (t, b, c, d) {
			if (t < d / 2){
				return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
			}else{
				return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
			}
		}
    }

    var color = {
        sub: function (str, start, len) {
            if (len) return str.substring(start, start + len);
            else return str.substring(start);
        },
        hex: function (i) {  // 返回16进制颜色表示
            if (i < 0) return "00";
            else if (i > 255) return "ff";
            else { var str = "0" + i.toString(16); return str.substring(str.length - 2); }
        },
        //获取颜色数据    
        GetColors: function (sColor) {
            sColor = sColor.replace("#", "");
            var r, g, b;
            if (sColor.length > 3) {
                r = color.sub(sColor, 0, 2); g = color.sub(sColor, 2, 2); b = color.sub(sColor, 4, 2);
            } else {
                r = color.sub(sColor, 0, 1); g = color.sub(sColor, 1, 1); b = color.sub(sColor, 2, 1);
                r += r; g += g; b += b;
            }
            return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
        }
    }
	/**
	 * 判断对象类型
	 * String Number Array
	 * Object Function 
	 * HTMLDocument
	 * Undefined Null 
	 */
	function TypeOf(obj) {
		return Object.prototype.toString.call(obj).match(/\s(\w+)/)[1];
	}
	/**
 	 * 遍历数组或对象
	 * 
	 */
	function each(arr,fn){
		//检测输入的值
		if(typeof(arr) == 'object' && typeof(fn) == 'function'){
			if(typeof(arr.length) != undefined){
				for(var i=0,total=arr.length;i<total;i++){
					fn.call(this,i,arr[i]);
				}
			}else{
				for(var i in arr){
					fn.call(this,i,arr[i]);
				}
			}
		}
	}
	/**
	 * 判断dom是否拥有某个class
	 */
	function hasClass(dom,classSingle){
		var classStr = dom.className;
		//dom有class 检测，无class，直接返回false
		if(classStr && classStr.length){
			return dom.className.match(new RegExp('(\\s|^)' + classSingle +'(\\s|$)'));
		}else{
			return false;
		}
	}
	//获取样式
	function getStyle(elem, prop) {
		var value;
		prop == "borderWidth" ? prop = "borderLeftWidth" : prop;
		if (elem.style[prop]){
			value = elem.style[prop];
		} else if(document.defaultView) {
			var style = document.defaultView.getComputedStyle(elem, null);
			value = prop in style ? style[prop] : style.getPropertyValue(prop);
		} else if (elem.currentStyle) {
			value = elem.currentStyle[prop];
		}
		
		
		if (/\px$/.test(value)){
			value = parseInt(value);
		} else if( value == +value){
			value = value = parseInt(value*10000)/10000;;
		} else if(value == '' || value == 'medium'){
			value = 0;
		} else if (value == 'auto'){
			if(prop == 'height'){
				value = elem.clientHeight;
			}
		}
		
		return value;
	}
	

	/**
	 * dom设置样式
	 */
	function setStyle(elem,prop,value){
	
		if(typeof(value) != 'string' && (value != +value)){
			//console.log(prop,'-',value,'-','error');
			return
		}
		prop = prop.toString();
		if (prop == "opacity") {
			elem.style['filter'] = 'alpha(opacity=' + (value * 100)+ ')';
			value = value;
		} else if (value == +value && value != ''){
			value = value + "px";
		}
		//console.log(prop,value)
		elem.style[prop] = value;
	}
	//设置css
	function setCss(dom,cssObj){
		for (var pro in cssObj) {
			if (!cssObj.hasOwnProperty(pro)){
				continue;
			}
			setStyle(dom,pro,cssObj[pro]);
		}
	}
	
	//格式化css属性值
	function parseCSS_value(input){
		var output;
		if (input == "transparent") {
			output = [255, 255, 255,0];
		}else if (/^#/.test(input)) {
			output = color.GetColors(input);
		} else if (/^rgb/.test(input)) {
			//获得css值为rgba或rgb对应值（数组）
			output = input.match(/([0-9]+)/g);
		} else if (input == "opacity") {
			output = 100 * input;
		} else if (/\px$/.test(input)){
			output = parseInt(input);
		} else if( input == +input){
			output = value = parseInt(input*10000)/10000;;
		}
		return output;
	}
	
	/**
	 * 获取动画所需的参数
	 * 属性名
	 * 初始值
	 * 目标值
	 */
	function parseCSS_forAnim (elem, cssObj) {
		var props = [];
		var cssOri = [];
		var cssEnd = [];
		for (var prop in cssObj) {
			if (!cssObj.hasOwnProperty(prop)){
				continue;
			}
			
			var value = getStyle(elem, prop);
			value = parseCSS_value(value);
			
			if(value || (value == +value)){
				props.push(prop);
				cssOri.push(value);
				cssEnd.push(cssObj[prop]);
			}
			
		}
		return [props,cssOri,cssEnd];
	}
	
	//给定计算方式，当前帧的CSS值
	function countNewCSS(start,end,use_time,all_time,fn){
		var output
		if (TypeOf(start) == "Array" && TypeOf(end) == "Array") {
			//rgb初始值
			var r_s = start[0],
				g_s = start[1],
				b_s = start[2];
			//rgb变化差值
			var r_m = end[0] - r_s,
				g_m = end[1] - g_s,
				b_m = end[2] - b_s;
			//新的rgb值
			var r_n = Math.ceil(fn(use_time, r_s, r_m, all_time)),
				g_n = Math.ceil(fn(use_time, g_s, g_m, all_time)),
				b_n = Math.ceil(fn(use_time, b_s, b_m, all_time));
			
			if(start.length == 4 || end.length == 4){
				var a_s = start[3] || 100;
				var a_m = (end[3] || 100) - start[3];
				var a_n = fn(use_time, a_s, a_m, all_time);
				output = 'rgba(' + r_n + ',' + g_n + ',' + b_n + ',' + (a_n/100) + ')';
			}else{
				output = 'rgba(' + r_n + ',' + g_n + ',' + b_n + ')';
			}
		} else {
			start = start * 10000;
			end = end * 10000;
			output = fn(use_time, start, (end-start), all_time);
			output = output/10000;
		}
		
		return output
	}
	var requestAnimationFrame = (function () {
        return  window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, 10);
				};
    })();
	
	/**
	 * 动画类
	 *
	 */
    function anim(elem,cssObj,durtime) {
		var args = arguments;
        this.elem = elem;
		
		var cssParse = parseCSS_forAnim(this.elem, cssObj);
		
		//需要修改的属性Array
		this.props = cssParse[0];
		//属性初始值Array
		this.cssOri = cssParse[1];
		//属性目标值Array
		this.cssEnd = cssParse[2];
		this.durtime = durtime;
		this.animType = "Linear";
		this.onEnd = null;
		if (args.length < 3) {
			throw new Error("missing arguments [dom,cssObj,durtime]");
		} else {
			if (TypeOf(args[3]) == "Function") {
				this.onEnd = args[3];
			}else if (typeof (args[3]) == "string") {
				this.animType = args[3];
			}
			
			if (TypeOf(args[4]) == "Function") {
				this.onEnd = args[4];
			}
		}
		this.animType = 'Tween.' + this.animType;
		this.startAnim();
    }
    anim.prototype['startAnim'] = function () {
		var me = this;
		//全部时间 | 开始时间
		var time_all = this.durtime;
		var time_start = new Date();
		
		//运动曲线方程
		var aniFunction = (eval(me.animType));
		
		//是否已结束动画
		var is_end = false;
		
		//需要修改的css条数
		var css_length = this.props.length;
		
		//显示当前帧（递归）
		function showFrame(){
			var time_use = new Date() - time_start;
			
			if (time_use < time_all) {
				requestAnimationFrame(showFrame);
			}else{
				time_use = time_all;
				is_end = true;
			}
			
			for (var i = 0; i < css_length; i++) {
				//计算当前帧需要的属性值
				var value = countNewCSS(me.cssOri[i],me.cssEnd[i],time_use,time_all,aniFunction);
				setStyle(me.elem,me.props[i],value);
			}
			
			if(is_end){
				me.onEnd && me.onEnd.call(me, me.elem);
			}
		}
		//开始动画
		requestAnimationFrame(showFrame);
	};
	
	
	
	//创建dom
	function createDom(html){
		var a = document.createElement('div');
		a.innerHTML = html;
		return a.childNodes;
	}
	//创建style标签
	function createStyleSheet(cssStr,attr){
		var styleTag = document.createElement('style');
		
		attr = attr || {};
		attr.type = "text/css";
		for(var i in attr){
			styleTag.setAttribute(i, attr[i]);
		}
		
		// IE
		if (styleTag.styleSheet) {
			styleTag.styleSheet.cssText = cssStr;
		} else {
			var tt1 = document.createTextNode(cssStr);
			styleTag.appendChild(tt1);
		}
		
		return styleTag;
	}
	
	//读取dom在页面中的位置
	function offset(elem){
		var box = {
			'top' : 0,
			'left' : 0,
			'screen_top' : 0,
			'screen_left' : 0
		}
		var size;
		
		if ( typeof elem.getBoundingClientRect !== 'undefined' ) {
			size = elem.getBoundingClientRect();
		}
		box.screen_top = size.top;
		box.screen_left = size.left;
		box.top = size.top + document.body.scrollTop;
		box.left = size.left + document.body.scrollLeft;
		
		return box;
	}
	
	var outerWidth,
		outerHeight;
	var testDom = document.createElement('div');
	//用生命在计算宽度
	function count_outerWidth (elem){
		return (getStyle(elem,'borderLeftWidth') + getStyle(elem,'paddingLeft') + getStyle(elem,'width') + getStyle(elem,'paddingRight') + getStyle(elem,'borderRightWidth'));
	}
	//用生命在计算高度
	function count_outerHeight (elem){
		return (getStyle(elem,'borderTopWidth') + getStyle(elem,'paddingTop') + getStyle(elem,'height') + getStyle(elem,'paddingBottom') + getStyle(elem,'borderBottomWidth'));
	}
	if(testDom.getBoundingClientRect !== 'undefined'){
		outerWidth = function(elem){
			var output = elem.getBoundingClientRect()['width'] || 0;
			if(typeof(output) == 'undefined'){
				output = count_outerWidth(elem);
			}
			return output;
		};
		outerHeight = function(elem){
			var output = elem.getBoundingClientRect()['height'] || 0;
			if(typeof(output) == 'undefined'){
				output = count_outerHeight(elem);
			}
			return output;
		};
	}else{
		outerWidth = count_outerWidth;
		outerHeight = count_outerHeight;
	}
	
	//根据class查找元素
	var findByClassName = (function(){
		if(typeof(document.getElementsByClassName) !== 'undefined'){
			//支持gEbCN
			return function (dom,classStr){
				return dom.getElementsByClassName(classStr);
			};
		}else{
			//无奈采用遍历法
			return function (dom,classStr){
				var returns = [];
				//尝试获取所有元素
				var caches = dom.getElementsByTagName("*");
				//遍历结果
				each(caches,function(i,thisDom){
					//检查class是否合法
					if(hasClass(thisDom,classStr)){
						returns.push(thisDom);
					}
				});
				return returns;
			};
		}
	})();
	//移除dom节点
	function removeNode(elem){  
		if(elem && elem.parentNode && elem.tagName != 'BODY'){  
			elem.parentNode.removeChild(elem);  
		}  
	};
	
	//隐藏dom
	function hide(elem){
		elem.style['display'] = 'none';
	}
	//淡出
	function fadeOut(DOM,time,fn){
		var op = getStyle(DOM,'opacity');
		new anim(DOM,{
			'opacity' : 0
		}, time,function(){
			DOM.style['opacity'] = op;
			DOM.style['display'] = 'none';
			fn && fn.call(DOM);
		});
	}
	//淡入
	function fadeIn(DOM,time,fn){
		var op = getStyle(DOM,'opacity');
		DOM.style['opacity'] = 0;
		DOM.style['display'] = 'block';
		new anim(DOM,{
			'opacity' : op
		}, time, function(){
			fn && fn.call(DOM);
		});
	}
	//滑入
	function slideDown(DOM,time,fn){
		DOM.style['overflow'] = 'hidden';
		DOM.style['display'] = 'block';
		var height = DOM.scrollHeight;
		//FIXME padding
		new anim(DOM,{
			'height' : height
		}, time, function(){
			fn && fn.call(DOM);
		});
	}
	//滑出
	function slideUp(DOM,time,fn){
		DOM.style['overflow'] = 'hidden';
		//FIXME padding
		new anim(DOM,{
			'height' : 0,
			'padding' : 0
		}, time,function(){
			DOM.style['display'] = 'none';
			fn && fn.call(DOM);
		});
	}
	//缩小，淡出
	var zoomOut = private_css3 ? function(DOM,time,fn){
		var op = getStyle(DOM,'opacity');
		var transt = getStyle(DOM,'-webkit-transition');
		
		setCss(DOM,{
			'-webkit-transform' : 'scale(0.5)',
			'-webkit-transition' : time + 'ms',
			'opacity' : 0,
		});
		
		var delay;
		DOM.addEventListener("webkitTransitionEnd", function(){
			clearTimeout(delay);
			delay = setTimeout(function(){
				console.log(new Date());
				setCss(DOM,{
					'-webkit-transform' : 'scale(1)',
					'-webkit-transition' : transt,
					'opacity' : op,
				});
				fn && fn.call(DOM);
			},20);
		}, true);
	} : function (DOM,time,fn){
		var op = getStyle(DOM,'opacity');
		DOM.style['overflow'] = 'hidden';
		var width = getStyle(DOM,'width');
		var height = outerHeight(DOM);
		var left = getStyle(DOM,'left') || 0;
		var top = getStyle(DOM,'top') || 0;
		
		new anim(DOM,{
			'width' : width/2,
			'height' : height/2,
			'left' : (left + width/4),
			'top' : (top + height/4),
			'opacity' : 0
		},time,function(){
			DOM.style['opacity'] = op;
			DOM.style['display'] = 'none';
			fn && fn.call(DOM);
		});
	};
	
	/**
	 * 页面加载
	 */
	var readyFns = [];
	function completed() {
		removeHandler(document,"DOMContentLoaded", completed);
		removeHandler(window,"load", completed);
		for(var i =0,total=readyFns.length;i<total;i++){
			readyFns[i]();
		}
		readyFns = null;
	}
	function ready(callback){
		if ( document.readyState === "complete" ) {
			callback && callback();
		} else {
			callback && readyFns.push(callback);
			
			bindHandler(document,'DOMContentLoaded',completed);
			bindHandler(window,'load',completed);
		}
	}
	
	/**
	 * 事件绑定
	 * elem:节点
	 * type:事件类型
	 * handler:回调
	 */
    var bindHandler = (function() {
		// 标准浏览器
		if (window.addEventListener) {
			return function(elem, type, handler) {
				// 最后一个参数为true:在捕获阶段调用事件处理程序
				//为false:在冒泡阶段调用事件处理程序
				elem.addEventListener(type, handler, false);
			}
		} else if (window.attachEvent) {
			// IE浏览器
			return function(elem, type, handler) {
				elem.attachEvent("on" + type, handler);
			}
		}
	})();

	/**
	 * 事件解除
	 * elem:节点
	 * type:事件类型
	 * handler:回调
	 */
	var removeHandler = (function() {
		// 标准浏览器
		if (window.removeEventListener) {
			return function(elem, type, handler) {
				elem.removeEventListener(type, handler, false);
			}
		} else if (window.detachEvent) {
			// IE浏览器
			return function(elem, type, handler) {
				elem.detachEvent("on" + type, handler);
			}
		}
	})();
	
	function checkEventForClass(event,classStr,dom){
		var target = event.srcElement || event.target;
		while (1) {
			if(target == dom){
				return false;
			}
			if(hasClass(target,classStr)){
				return target;
			}
			if(!target){
				return false;
			}
			target = target.parentNode;
		}
	}
	function bind(elem, type,a,b){
		var className,fn;
		if(typeof(a) == 'string'){
			className = a.replace(/^\./,'');
			fn = b;
			bindHandler(elem,type,function(e){
				var bingoDom = checkEventForClass(e,className,elem);
				if(bingoDom){
					fn && fn.call(bingoDom);
				}
			});
		}else{
			fn = a;
			bindHandler(elem,type,fn);
		}
		//提供最原始的链式调用
		return function(type,a,b){
			return bind(elem,type,a,b);
		};
	}
	//通用拖动方法
	function drag(handle_dom,dom,param){
		var param = param || {};
		var onStart = param['start'] || null;
		var onMove = param['move'] || null;
		var onEnd = param['end'] || null;
		
		var X, Y,L,T,W,H;
		bindHandler(handle_dom,'mousedown',function (e){
			e.preventDefault && e.preventDefault();
			e.stopPropagation && e.stopPropagation();
			X = e.clientX;
			Y = e.clientY;
			L = getStyle(dom,'left');
			T = getStyle(dom,'top');
			W = outerWidth(dom);
			H = outerHeight(dom);
			onStart && onStart.call(dom,X,Y);
			bindHandler(document,'mousemove',move);
			bindHandler(document,'mouseup',up);
		});
		
		function move(e){
			onMove && onMove.call(dom,(e.clientX - X),(e.clientY - Y),L,T,W,H);
			//做了点儿猥琐的事情，你懂得
			e.preventDefault && e.preventDefault();
			e.stopPropagation && e.stopPropagation();
			window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
		}
		function up(e) {
			removeHandler(document,'mousemove',move);
			removeHandler(document,'mouseup',up);
			onEnd && onEnd.call(dom);
		}
	}
	
    return{
		'TypeOf' : TypeOf,
		'each' : each,
		'css' : setCss,
		'supports' : supports,
		'slideDown' : slideDown,
		'slideUp' : slideUp,
		'fadeIn' : fadeIn,
		'fadeOut' : fadeOut,
		'zoomOut' : zoomOut,
		'animation' : function(a,b,c,d,e) {
			return new anim(a,b,c,d,e);
		},
		'createDom' : createDom,
		'removeNode' : removeNode,
		'createStyleSheet' : createStyleSheet,
		'findByClassName' : findByClassName,
		'hasClass' : hasClass,
		'offset' : offset,
		'getStyle' : getStyle,
		'outerWidth' : outerWidth,
		'outerHeight' : outerHeight,
		'ready' : ready,
		'bind' : bind,
		'unbind' : removeHandler,
		'hide' : hide,
		'drag' : drag
    }
});