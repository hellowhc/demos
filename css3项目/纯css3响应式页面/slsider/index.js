(function($){
    function Swiper(opt){
        var opts=opt||{};
        this.wrap=opt.father;
        this.img=opts.Image;
        this.init();
    }

    //初始化数据 入口函数
    Swiper.prototype.init=function(){
        this.nowIndex=0;
        this.len=this.img.length-1;
        this.flag=true;
        this.timer=undefined;
        this.itemWidth=this.wrap.width();
        this.createDom();
        this.bindEvent();
        this.sliderAuto();
    }

    //动态创建dom元素
    Swiper.prototype.createDom=function(){
        var len=this.len;
        var list='';
        var sIn='';
        var imgBox=$(' <div class="imgBox"></div>');
        var ulist=$('<ul></ul>')
        var btn=$('<div class="btn">\
                <span class="leftBtn">&lt;</span>\
                <span class="rightBtn">&gt;</span>\
                                </div>');
        var check=$(' <div class="check"></div>');
        for(var i=0;i<len;i++){
            list+=' <li><a href="#"><img src="'+this.img[i]+'"></a></li>';
            sIn+=' <span></span>';
        }
        list+=' <li><a href="#"><img src="'+this.img[i]+'"></a></li>';
        $(list).appendTo(ulist);
        $(ulist).appendTo(imgBox);
        $(sIn).appendTo(check);
        this.wrap.append(imgBox)
                .append(btn)
                .append(check);
        $('.check>span').eq(0).addClass('active');
        $('.imgBox>ul').css({
            width:this.itemWidth*(this.len+1)+'px'
        });
        $('.imgBox>ul>li').css({
            width:this.itemWidth
        })
     }
    
    //点击事件
    Swiper.prototype.bindEvent=function(){
        var self=this;
        $('.leftBtn').add('.rightBtn').add('.check>span').on('click',function(){
            if($(this).attr('class') == 'leftBtn'){
                self.move('leftBtn')
            }else if($(this).attr('class') == 'rightBtn'){           
                self.move('rightBtn');
            }else{
                var index=$(this).index();
                self.move(index);
            }
        })
        self.wrap.on('mouseenter',function(){
            $('.btn').show();
            clearTimeout(self.timer);
        }).on('mouseleave',function(){          
            $('.btn').hide();
            self.sliderAuto();
            
        })
    }


    //移动
    Swiper.prototype.move = function(ele){
        if(this.flag){
            this.flag = false;
            if(ele == 'leftBtn'||ele == 'rightBtn'){
                if(ele=='leftBtn'){
                    if(this.nowIndex == 0){                     
                        $('.imgBox>ul').css({
                            left:-this.len*this.itemWidth
                        })
                        this.nowIndex = this.len-1;
                    }else{
                        this.nowIndex --;
                    }
                }else{
                    if(this.nowIndex == this.len-1){                     
                        $('.imgBox>ul').animate({left:-this.len*this.itemWidth},function(){
                            $(this).css({
                               left:0
                            })
                        })
                        this.nowIndex = 0;
                    }else{
                        this.nowIndex ++;
                    }
                }
            }else{
                this.nowIndex = ele;
            }
            this.checkIndex();
            this.slider();
        }

    }

    //自动轮播
    Swiper.prototype.sliderAuto=function(){
        var self=this;
        clearTimeout(self.timer);
        self.timer=setTimeout(function(){
            self.move('rightBtn');
        },1500)
    }

    //点击索引
    Swiper.prototype.checkIndex=function(){
        var self=this;
        $('.active').removeClass('active');
        $('.check>span').eq(self.nowIndex).addClass('active');
    }

    Swiper.prototype.slider=function(){
        var self=this;
        $('.imgBox>ul').animate({
            left:-self.nowIndex*self.itemWidth
        },function(){
            self.sliderAuto();
            self.flag=true;
        });
    }
    
    $.fn.extend({
        sliderImage:function(options){
            options.father=this||$('body');
            new Swiper(options);
        }
    })


}(jQuery))