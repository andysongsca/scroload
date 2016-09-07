# scroload
scroll to load or update
## 使用
```js
var scroload = $('.inner').scroload({
    loadFnc : function(me){
        $.ajax({
            type: 'GET',
            url: '../mock-data/more.json',
            dataType: 'json',
            success: function(data){
                var result = '';
                for(var i = 0; i < data.lists.length; i++){
                    result += '<a class="item opacity" href="'+data.lists[i].link+'">'
                                  +'<img src="'+data.lists[i].pic+'" alt="">'
                                  +'<h3>'+data.lists[i].title+'</h3>'
                                  +'<span class="date">'+data.lists[i].date+'</span>'
                              +'</a>';
                }
                // 为了测试，延迟1秒加载
                setTimeout(function(){
                    $('.lists').append(result);
                    // 每次数据加载完，必须重置
                    scroload.complete();
                },2000);
            },
            error: function(xhr, type){
                alert('Ajax error!');
                // 即使加载出错，也得重置
                scroload.complete();
            }
        });
    }
});
```
如果所有数据加载完毕，complete中传入true
