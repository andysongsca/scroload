/**
 * scroload
 * 上拉加载更多数据
 * @param
 * @return {null}
 */
;(function($) {
    'use strict';
    $.fn.scroload = function(options) {
        return new Scroload(this, options);
    }
    var Scroload = function($ele, options) {
        var me = this;
        me.$ele = $ele;
        me.$win = $(window);
        me._loading = false;
        _init(me, options);
        _bindEvent(me);
    }
    function _init(me, options) {
        me.ops = $.extend(true, {
            container: me.$ele,
            dropDistance: 100,
            startLoadOffsetY: 50,
            loadFnc: null
        }, options);

        if(me.ops.container === window) {
            me.$container = me.$win;
            me._scrollContentHeight = $(document).height();
            me._windowHeight = $(window).height();
        }else {
            me.$container = me.ops.container;
            me._scrollContentHeight = me.$ele[0].scrollHeight;
            me._windowHeight = me.$ele.height();
        }
        me.$ele.append('<div class="js-load-more"style="width: 100%;height: 44px;line-height: 44px;text-align: center;font-size: 16px;color: #888;">加载中...</div>');
    }
    function _bindEvent(me) {
        me.$win.on('resize', function() {
            _setScrollWindowHeight(me);
        });

        me.$ele.on('scroll', function(e) {
            me._scrollTop = me.$container.scrollTop();
            var isInLoadArea = me._windowHeight + me._scrollTop >= me._scrollContentHeight - me.ops.startLoadOffsetY ? true : false;
            if(!me._loading && isInLoadArea) {
                me._loading = true;
                me.ops.loadFnc && me.ops.loadFnc(me);
            }
        })
    }
    function _setScrollWindowHeight(me) {
        if(me.ops.container == window){
            // 重新获取win显示区高度
            me._scrollContentHeight = $(document).height();
            me._windowHeight = window.innerHeight;
        }else{
            me._scrollContentHeight = me.$ele[0].scrollHeight;
            me._windowHeight = me.$ele.height();
        }
    }
    Scroload.prototype.complete = function(isNoData) {
        var me = this;
        me._loading = false;
        _setScrollWindowHeight(me);
        if(isNoData) {
            $('.js-load-more').html('没有更多了...');
        }
    }

})(window.Zepto || window.jQuery)
