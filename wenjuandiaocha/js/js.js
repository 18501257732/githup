
function info(){
    Sajax()
}

function Sajax(){
        $.ajax({
            url:'data/wennjuan.json',
            type:'get',
            dataType:'json',
            data:{},
            success: function (data) {
                sjs(data);
                console.log(data)
            },
            error:function(){
                alert('请求失败')
            }
        });
    }
    function sjs(data){
        console.log(data)
        var str='';
        $.each(data,function(i,v){
            str+='<div>'
                    +'<dl class="up">'
                        +'<dt><img src="'+ v.img+'"></dt>'
                        +'<dd>'
                            +'<h2><a href="index1.html?id:'+ v.Id+'">'+v.QuestionName+'</a></h2>'
                        +'<h3>'+v.QuestionContent+'</h3>'
                    +'</dd>'
                    +'</dl>'
                    +'<p><img src="'+v.bimg+'"></p>'
                    +'<h5 class="sipen">现在共有'+v.CountQuestion+'个问题共有100人参与</h5>'
                +'</div>'
        });

        $('#continer').append(str);
    }
    info();





