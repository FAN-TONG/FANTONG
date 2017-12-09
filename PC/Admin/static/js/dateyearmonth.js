var arrmonth=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
var arryear=[1,2,3,4,5,6,7,8,9,0]
_CalF = {
    // 选择元素
    $:function(arg,context){
        var tagAll,n,eles=[],i,sub = arg.substring(1);
        context = context||document;
        if(typeof arg =='string'){
            switch(arg.charAt(0)){
                case '#':
                    return document.getElementById(sub);
                    break;
                case '.':
                    if(context.getElementsByClassName) return context.getElementsByClassName(sub);
                    tagAll = _CalF.$('*',context);
                    n = tagAll.length;
                    for(i = 0;i<n;i++){
                        if(tagAll[i].className.indexOf(sub) > -1) eles.push(tagAll[i]);
                    }
                    return eles;
                    break;
                default:
                    return context.getElementsByTagName(arg);
                    break;
            }
        }
    }, 
    // 绑定事件
    bind:function(node,type,handler){
        node.addEventListener?node.addEventListener(type, handler, false):node.attachEvent('on'+ type, handler);
    },
	getWidth:function(node){
		return node.offsetWidth;
	},
    // 获取元素位置
    getPos:function (node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
                scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        pos = node.getBoundingClientRect();
        return {top:pos.top + scrollt, right:pos.right + scrollx, bottom:pos.bottom + scrollt, left:pos.left + scrollx }
    },
    // 添加样式名
    addClass:function(c,node){
        node.className = node.className + ' ' + c;
    },
    // 移除样式名
    removeClass:function(c,node){
        var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)","g");
        node.className = node.className.replace(reg, '');
    },
    // 阻止冒泡
    stopPropagation:function(event){
        event = event || window.event;
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    },
	hasClass: function(className,node) {
    	return node.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(node.className);
	}
};
function dateyearmonth(){
	this.initialize.apply(this, arguments);
}
dateyearmonth.prototype={
	 constructor:dateyearmonth,
	 initialize :function (options) {
        this.id = options.id; // input的ID
        this.input = _CalF.$('#'+ this.id); // 获取INPUT元素
        this.inputEvent(); // input的事件绑定，获取焦点事件
     },
	 createContainer:function(){
		  var odiv = _CalF.$('#kui_'+ this.id);
		    var input = _CalF.$('#' + this.id),
					inputPos = _CalF.getPos(input); 
				// 根据input的位置设置container;
			var x = inputPos.left;  
			var y = inputPos.top+inputPos.getWidth;     
			var w=inputPos.getWidth;       
			var bodyw=document.body.clientWidth; 
          if(!!odiv){
			  odiv.parentNode.removeChild(odiv);	 
		  }
		  var container = this.container = document.createElement('div');
		  container.className='kui-datepicker-range kui-absolute kui-datepicker-month-range';
		  container.id='kui_'+ this.id; 
		
			if(bodyw-x<container.offsetWidth){
				container.style.right=bodyw-x-w+"px"; 
			}else{
				container.style.left=x+"px"; 
			}  
			container.style.top=y+"px"; 
			container.style.display = "block"; 
			document.body.appendChild(container);
	 },
	  // 渲染日期
    drawDate:function (vdate) { 
	     var ss =vdate.split("-");
		 var selectHtml; 
		  var year,month; 
		 if(ss.length==1){
			 var myDate = new Date();
			  this.year=this.maxyear.toString();
			   month=myDate.getMonth()+1;
			   this.month =(month<10 ? "0"+month:month); 
			 vdate=this.year+'-'+this.month; 
		 }else{
			   this.year=trim(ss[0]);
			   this.month=trim(ss[1]); 
		 }  
		 selectHtml='<div class="kui-datepicker-begin">'
			+'<div class="kui-datepicker kui-relative kui-datepicker-month" >'
			+'<div class="kui-datepicker-monthcontainer ">'
				+'<div class="kui-datepicker-monthcontainer-inner">'
					+'<div class="kui-month-container  ">' 
					+this.createMonth(this.month)
					+'</div>'
					+'<div class="kui-year-container">'
						+'<div class="kui-year-nav"></div>'
						+'<div class="kui-yearlist">'
							+'<span class="prevyears iconfont icon-xiangzuo"></span>' 
							+this.createYear(this.year,this.year)
							+'<span class="nextyears iconfont icon-goright"></span>'
						+'</div></div></div></div></div></div>'
						 +'<div class="kui-datepicker-range-footer" style="padding-left:5px;padding-right:5px;">'
			+'<span class="pull-left">已选择：<label>'+vdate+'</label></span>'
			+'<button class="btn btn-white btn-sm select">确定</button>'
			+'<button class="btn btn-white btn-sm clean">取消</button></div>'; 
		this.container.innerHTML=selectHtml; 
		
		this.btnMonth();
		this.btnYear();
		this.btnPrevYear();
		this.btnNextYear();
		this.outClick();
		this.btnClean();
		this.btnSelect();
	}, 
	drawDate1:function(vdate){
		var ss =vdate.split("-");
		 if(ss.length==1){ 
			  this.year1=this.year=this.maxyear.toString(); 
			   this.month1=this.month =this.maxmonth; 
			 vdate=this.year+'-'+this.month+' - '+this.year1+'-'+this.month1; 
		 }else{
			   this.year=trim(ss[0]);
			   this.month=trim(ss[1]); 
			   this.year1=trim(ss[2]);
			   this.month1=trim(ss[3]); 
		 } 
		 var odiv = _CalF.$('#kui_'+ this.id);
		
		 var input = _CalF.$('#' + this.id),inputPos = _CalF.getPos(input); 
		// 根据input的位置设置container;
		var x = inputPos.left;  
		var y = inputPos.top+inputPos.getWidth;     
		var w=inputPos.getWidth;       
		var bodyw=document.body.clientWidth; 
		 if(!!odiv){
			  odiv.parentNode.removeChild(odiv);		 
	     }
		 var container = this.container = document.createElement('div');
		 container.className='kui-datepicker-range kui-absolute kui-datepicker-month-range';
		 container.id='kui_'+ this.id; 
		 if(bodyw-x<container.offsetWidth){
			container.style.right=bodyw-x-w+"px"; 
		 }else{
			container.style.left=x+"px"; 
		 }  
		 container.style.top=y+"px"; 
		 container.style.display = "block"; 
		 
		  var container_begin = this.container_begin = document.createElement('div');
		 container_begin.className='kui-datepicker-begin'; 
		container_begin.innerHTML='<div class="kui-datepicker kui-relative kui-datepicker-month" >'
                +'<div class="kui-datepicker-monthcontainer ">'
                    +'<div class="kui-datepicker-monthcontainer-inner">'
                        +'<div class="kui-month-container">' 
                        +this.createMonth(this.month)        
                        +'</div>'
                        +'<div class="kui-year-container">'
                            +'<div class="kui-year-nav"></div>'
                            +'<div class="kui-yearlist">'
                            	+'<span class="prevyears iconfont icon-xiangzuo"></span>'
                                +this.createYear(this.year,this.year)
                                +'<span class="nextyears iconfont icon-goright"></span>'
                            +'</div></div></div></div></div>';
		 this.container.appendChild(container_begin);
		 var container_end = this.container_end = document.createElement('div');
		 container_end.className='kui-datepicker-end'; 
		container_end.innerHTML='<div class="kui-datepicker kui-relative kui-datepicker-month"> '
               +'<div class="kui-datepicker-monthcontainer ">'
                    +'<div class="kui-datepicker-monthcontainer-inner">'
                        +'<div class="kui-month-container">' 
                        +this.createMonth(this.month1)             
                        +'</div>'
                        +'<div class="kui-year-container">'
                            +'<div class="kui-year-nav"></div>'
                            +'<div class="kui-yearlist">'
                            	+'<span class="prevyears iconfont icon-xiangzuo"></span>'
                                +this.createYear(this.year1,this.year1)
                                +'<span class="nextyears iconfont icon-goright"></span>'
                            +'</div></div></div></div></div>';
		 this.container.appendChild(container_end);
		 var container_footer = this.container_footer = document.createElement('div');
		 container_footer.className='kui-datepicker-range-footer'; 
		 container_footer.innerHTML='<div class="kui-datepicker-range-footer">'
                +'<span class="pull-left">已选择：<label>'+vdate+'</label></span>'
                +'<button class="btn btn-white btn-sm select">确定</button>'
                +'<button class="btn btn-white btn-sm clean">取消</button></div>'; 
		this.container.appendChild(container_footer); 
		document.body.appendChild(container);
		this.btnMonth();
		this.btnYear();
		this.btnPrevYear();
		this.btnNextYear();
		this.outClick();
		this.btnClean();
		this.btnSelect();
	},
    // 表单的事件
    inputEvent:function(){
        var that = this;
		if(!!document.getElementById(that.id).getAttribute("data-min-year")){
			that.minyear=parseInt(document.getElementById(that.id).getAttribute("data-min-year"));
		}else{
			that.minyear=1901;
		}
		if(!!document.getElementById(that.id).getAttribute("data-max-year")){
			that.maxyear=parseInt(document.getElementById(that.id).getAttribute("data-max-year"));
			 that.maxmonth='12';
		}else{ 
			 var myDate = new Date();
			 that.maxyear=parseInt(myDate.getFullYear().toString()); 
			 var month=mDate.getMonth()+1;
	  		 that.maxmonth =(month<10 ? "0"+month:month); 
		}
		that.minmonth='01'; 		 
	
        _CalF.bind(this.input, 'focus',function(){ 
			var format=document.getElementById(that.id).getAttribute("data-format");
			var val=document.getElementById(that.id).value;
			if(format.split('-').length==2){
				that.createContainer();
				 that.drawDate(val);  
			}else{
				 that.drawDate1(val);
			} 
        });
    },
	// 移除日期DIV.calendar
    removeDate:function(){ 
	    this.container.innerHTML=''; 
    },
	btnPrevYear:function(){ 
	   var that=this;  
	   if(document.getElementById(that.id).getAttribute("data-format").split('-').length==2){
			var _year=_CalF.$('.kui-yearlist',that.container)[0]; 
			var that=this;
			_year.querySelector('.prevyears').onclick=function(){
				 var _spanlist=_CalF.$('.kui-year',_year); 
				 var minyear=parseInt(_spanlist[0].innerHTML);
				 if(minyear>that.minyear){
					 for(j=0;j<_spanlist.length;j++){
						 _CalF.removeClass("kui-active-date",_spanlist[j]);
						 if(minyear-10+j==that.year){
							  _CalF.addClass("kui-active-date",_spanlist[j]);
						 }
						 _spanlist[j].innerHTML=minyear-10+j;
					 }
					 that.btnPrevYear();
				 }
			} 
	   }else{
		   var _year=_CalF.$('.kui-yearlist',that.container_begin)[0];  
			_year.querySelector('.prevyears').onclick=function(){
				 var _spanlist=_CalF.$('.kui-year',_year); 
				  var minyear=parseInt(_spanlist[0].innerHTML); 
				  if(minyear>that.minyear){
					 for(j=0;j<_spanlist.length;j++){
						 _CalF.removeClass("kui-active-date",_spanlist[j]);
						 if(minyear-10+j==that.year){
							  _CalF.addClass("kui-active-date",_spanlist[j]);
						 }
						 _spanlist[j].innerHTML=minyear-10+j;
					 }
					 that.btnPrevYear();
				 } 
			} 
			var _year1=_CalF.$('.kui-yearlist',that.container_end)[0];  
			_year1.querySelector('.prevyears').onclick=function(){
				 var _spanlist=_CalF.$('.kui-year',_year1);
				 var minyear=parseInt(_spanlist[0].innerHTML);  
				  if(minyear>that.minyear){
					 for(j=0;j<_spanlist.length;j++){
						 _CalF.removeClass("kui-active-date",_spanlist[j]);
						 if(minyear-10+j==that.year){
							  _CalF.addClass("kui-active-date",_spanlist[j]);
						 }
						 _spanlist[j].innerHTML=minyear-10+j;
					 }
					 that.btnPrevYear();
				 } 
			} 
	   }
	},
	btnNextYear:function(){
		var that=this; 
		if(document.getElementById(that.id).getAttribute("data-format").split('-').length==2){
			var _year=_CalF.$('.kui-yearlist',that.container_begin)[0]; 
			_year.querySelector('.nextyears').onclick=function(){
				 var _spanlist=_CalF.$('.kui-year',_year); 
				 var maxyear=parseInt(_spanlist[_spanlist.length-1].innerHTML);
				 if(maxyear<that.maxyear){
					 for(j=0;j<_spanlist.length;j++){
						 _CalF.removeClass("kui-active-date",_spanlist[j]);
						 if(maxyear+1+j==that.year){
							  _CalF.addClass("kui-active-date",_spanlist[j]);
						 }
						 _spanlist[j].innerHTML=maxyear+1+j;
					 }
					 that.btnPrevYear();
				 }
			} 
		}else{
			var _year=_CalF.$('.kui-yearlist',that.container_begin)[0]; 
			_year.querySelector('.nextyears').onclick=function(){
				 var _spanlist=_CalF.$('.kui-year',_year); 
				 var maxyear=parseInt(_spanlist[_spanlist.length-1].innerHTML);  
				  if(maxyear<that.maxyear){
					 for(j=0;j<_spanlist.length;j++){
						 _CalF.removeClass("kui-active-date",_spanlist[j]);
						 if(maxyear+1+j==that.year){
							  _CalF.addClass("kui-active-date",_spanlist[j]);
						 }
						 _spanlist[j].innerHTML=maxyear+1+j;
					 }
					 that.btnPrevYear();
				 }
			} 
			var _year1=_CalF.$('.kui-yearlist',that.container_end)[0]; 
			_year1.querySelector('.nextyears').onclick=function(){
				 var _spanlist=_CalF.$('.kui-year',_year1); 
				 var maxyear=parseInt(_spanlist[_spanlist.length-1].innerHTML);
				  if(maxyear<that.maxyear){
					 for(j=0;j<_spanlist.length;j++){
						 _CalF.removeClass("kui-active-date",_spanlist[j]);
						 if(maxyear+1+j==that.year){
							  _CalF.addClass("kui-active-date",_spanlist[j]);
						 }
						 _spanlist[j].innerHTML=maxyear+1+j;
					 }
					 that.btnPrevYear();
				 }			
			} 
		}
	},
	btnMonth:function(){
		var that=this; 
		if(document.getElementById(that.id).getAttribute("data-format").split('-').length==2){
			var _month = _CalF.$('.kui-month-container',that.container)[0];
			var _spanlist=_CalF.$('span',_month);
			for(i = 0;i<_spanlist.length;i++){ 
				_spanlist[i].onclick = function(){ 
					var monint=arrmonth.contains(this.innerHTML);
					var thatmonth=monint<10? "0"+monint:monint;
					var minyh=parseInt(that.year+thatmonth);
					if(minyh>=parseInt(that.minyear+that.minmonth)&&minyh<=parseInt(that.maxyear+that.maxmonth)){
						that.month=thatmonth; 
						_CalF.$('label',that.container)[0].innerHTML= that.year + '-'+that.month;
						for(j=0;j<_spanlist.length;j++){
							 _CalF.removeClass("kui-active-date",_spanlist[j]);
						}
						_CalF.addClass("kui-active-date",this);
					}
				}
			}
		}else{ 
			var _month = _CalF.$('.kui-month-container',that.container_begin)[0];
			var _spanlist=_CalF.$('span',_month); 
			for(i = 0;i<_spanlist.length;i++){ 
				_spanlist[i].onclick = function(){ 
					var monint=arrmonth.contains(this.innerHTML);
					var thatmonth=monint<10? "0"+monint:monint;
					var minyh=parseInt(that.year+thatmonth);
					var maxyh=parseInt(that.year1+that.month1);
					if(minyh<=maxyh&&minyh>=parseInt(that.minyear+that.minmonth)){
						that.month=thatmonth; 
						_CalF.$('label',that.container)[0].innerHTML= that.year+'-'+that.month+' - '+that.year1+'-'+that.month1; 
						for(j=0;j<_spanlist.length;j++){
							 _CalF.removeClass("kui-active-date",_spanlist[j]);
						}
						_CalF.addClass("kui-active-date",this);
					}
				}
			}
			var _month1 = _CalF.$('.kui-month-container',that.container_end)[0];
			var _spanlist1=_CalF.$('span',_month1); 
			for(i = 0;i<_spanlist1.length;i++){ 
				_spanlist1[i].onclick = function(){
					var monint=arrmonth.contains(this.innerHTML);
					var thatmonth=monint<10? "0"+monint:monint;
					var minyh=parseInt(that.year+that.month);
					var maxyh=parseInt(that.year1+thatmonth);
					if(maxyh>=minyh&&maxyh<=parseInt(that.maxyear+that.maxmonth)){ 
						that.month1=thatmonth; 
						_CalF.$('label',that.container)[0].innerHTML= that.year+'-'+that.month+' - '+that.year1+'-'+that.month1; 
						for(j=0;j<_spanlist1.length;j++){
							 _CalF.removeClass("kui-active-date",_spanlist1[j]);
						}
						_CalF.addClass("kui-active-date",this);
					}
				}
			}
		}
	}, 
	btnYear:function(){
		var that=this; 
		if(document.getElementById(that.id).getAttribute("data-format").split('-').length==2){ 
			var _year=_CalF.$('.kui-yearlist',this.container)[0];
			var _yearlist=_CalF.$('.kui-year',_year);
			for(i=0;i<_yearlist.length;i++){
				_yearlist[i].onclick=function(){ 
					var yearint=this.innerHTML; 
					var minyh=parseInt(yearint+that.month); 
					if(minyh>=parseInt(that.minyear+that.minmonth)&&minyh<=parseInt(that.maxyear+that.maxmonth)){ 
						that.year=yearint; 
						_CalF.$('label',that.container)[0].innerHTML= that.year + '-'+that.month;
						for(j=0;j<_yearlist.length;j++){
							 _CalF.removeClass("kui-active-date",_yearlist[j]);
						}
						_CalF.addClass("kui-active-date",this);
					}
				}
			}
		}else{ 
			var _year=_CalF.$('.kui-yearlist',that.container_begin)[0];
			var _yearlist=_CalF.$('.kui-year',_year);
			for(i=0;i<_yearlist.length;i++){
				_yearlist[i].onclick=function(){ 
				    var yearint=this.innerHTML; 
					var minyh=parseInt(yearint+that.month);
					var maxyh=parseInt(that.year1+that.month1); 
					if(minyh<=maxyh&&minyh>=parseInt(that.minyear+that.minmonth)){ 
						that.year=yearint;
						_CalF.$('label',that.container)[0].innerHTML= that.year+'-'+that.month+' - '+that.year1+'-'+that.month1; 
						for(j=0;j<_yearlist.length;j++){
							 _CalF.removeClass("kui-active-date",_yearlist[j]);
						}
						_CalF.addClass("kui-active-date",this);
					} 
					
				}
			}
			var _year1=_CalF.$('.kui-yearlist',that.container_end)[0];
			var _yearlist1=_CalF.$('.kui-year',_year1); 
			console.log(_yearlist1.length); 
			for(i=0;i<_yearlist1.length;i++){ 
				_yearlist1[i].onclick=function(){ 
				     var yearint=this.innerHTML; 
					var minyh=parseInt(that.year+that.month);
					var maxyh=parseInt(yearint+that.month1);
					//console.log(minyh);
					//console.log(maxyh);
					if(maxyh>=minyh&&maxyh<=parseInt(that.maxyear+that.maxmonth)){
						that.year1=yearint;
						_CalF.$('label',that.container)[0].innerHTML= that.year+'-'+that.month+' - '+that.year1+'-'+that.month1; 
						for(j=0;j<_yearlist1.length;j++){
							 _CalF.removeClass("kui-active-date",_yearlist1[j]);
						}
						_CalF.addClass("kui-active-date",this);
					}
				}
			}
		}
	},
	btnSelect:function(){
		var _select = _CalF.$('.select',this.container)[0],
		 	 that = this;
		
		 _select.onclick = function(){ 
		 	var format=document.getElementById(that.id).getAttribute("data-format");
		   if(format.split('-').length==2){
			 that.input.value=that.year + '-'+that.month;
			 that.removeDate();
		   }else{
			 that.input.value=that.year+'-'+that.month+' - '+that.year1+'-'+that.month1; 
			 that.removeDate();
		   }
		}; 
	},
	btnClean:function(){
		 var clean = _CalF.$('.clean',this.container)[0],
		 	 that = this;
		 clean.onclick = function(){ 
            that.removeDate();
        };
	},
    // 鼠标在对象区域外点击，移除日期层
    outClick:function(){
        var that = this;
        _CalF.bind(document, 'click',function(event){
            event = event || window.event;
            var target = event.target || event.srcElement;
            if(target == that.input) { 
				return;
			} 
			if(that.container.contains(target)){
				return;
			}
            that.removeDate();
        })
    },
    createMonth:function(month){
		var _mon=parseInt(month);
		var monstr='';
		for(i=0;i<arrmonth.length;i++){
			if(i+1==_mon){
				monstr+='<span class="kui-active-date">'+arrmonth[i]+'</span>';
			}else{
				monstr+='<span>'+arrmonth[i]+'</span>';
			}
		}
		return monstr;
	},
	 createYear:function(year,activeyear){ 
		var _yea=year;
		var _yea_last=parseInt(_yea.charAt(_yea.length - 1));  
		var yeastr='';
		_yea=parseInt(_yea);
		for(i=0;i<arryear.length;i++){  
			var years;
			if(_yea_last==0){ 
				years=_yea+(arryear[i]==0?10:arryear[i])-10; 
			}else{
				years=_yea+(arryear[i]==0?10:arryear[i])-_yea_last; 
			} 
			if(activeyear==years){
				yeastr+='<span class="kui-active-date kui-year">'+years+'</span>'; 
			}else{
				yeastr+='<span class="kui-year">'+years+'</span>'; 
			}
		}
		return yeastr;
	}
}; 
function trim(str) {
    return str.toString().replace(/^\s+|\s+$/g,'');
}
Array.prototype.contains = function (obj) { 
	var i = this.length; 
	while (i--) {
		if (this[i] === obj) {
		  return i+1;
		}
	}
	return 0;
}