
var myScroll1;
myScroll1=new iScroll('iscoll',{
    onBeforeScrollStart:function(e){
        var ele=e.target.tagName.toLowerCase();
        if(ele!='input' && ele!='textarea' && ele!='select'){
            e.preventDefault();
        }
    },
    checkDOMChanges:true,
    fadeScrollbar:true,
    hScrollbar:false,
    vScrollbar:false
});







Sajax()
function  Sajax(){
    $.ajax({
        url:'data/data.json',
        type:'post',
        dataType:'json',
        success:function(data){
            sl(data)
        }
    });

}

function sl(data){
    var anal=analysis()
    if(data.length){
        for(var i in data){
            if(anal.id==data.Id){

                $('#sent_top').find('h2').text(data[i].QuestionContent);
               $.each(data[i].listSurveyQuestione,function(k,v){
                    var type= v.SelectCount>1?'checkbox':'radio',
                        typename= v.SelectCount>1?'多选':'单选'
                   var str='',aftername='',aa='';
                   if(v.IsRequired){
                       aftername=typename+'必选';
                       aa="aa"
                   }else{
                       aftername=typename+'非必选';
                   }
                   $.each(v.listSurveyQuestionAskModel,function(q,w){
                       dis= w.IsRigth?'disabled':'';
                       if(!dis){
                            str+='<div>'
                                +'<input name="sss'+w.SurveyQuestionId+'" type="'+type+'" data-mas="sss" id="chenken'+ w.Id+'" data-s="'+ w.AskScore+'" '+dis+' class="sloeo">'
                                 +'<label for="chenken'+ w.Id+'"></label>'
                                +'<a>伙食<span>(常态/为选取)</span></a>'
                            +'</div>'
                       }else{
                           str1='<div>'
                               +'<input '+w.SurveyQuestionId+'  type="'+type+'" data-mas="sss" id="chenken'+ w.Id+'" data-s="'+ w.AskScore+'" '+dis+' class="sloeo">'
                                +'<label for="chenken'+ w.Id+'"></label>'
                                +'<a>伙食<span>(常态/为选取)</span></a>'
                           +'</div>'
                       }


                   })
                   str+=str1
                   var html='<li data="'+aa+'">'
                       +'<h2>'+(k+1)+' '+ v.SurveyQuestionContent+'<a>('+aftername+')</a></h2>'
                       +str+
                       '</li>'
                   $('#sent_s').append($(html));
               })

            }
        }
    }

}






sent()
function sent(){
    $('#sent_s').on('change','input',function(){
        $(this).parent('div').toggleClass('on')
        if($(this).prop('checked')){
            $(this).parents('li[data=aa]').attr('data-s','yes')
            if($(this).attr('type')=='radio'){
                $(this).next().next().find('span').html('(选中)').parents('div').siblings().find('span').html('(常态/未选取)');
                $(this).parent('div').addClass('on').siblings().removeClass('on')
            }else{
                $(this).next().next().find('span').html('(选中)')
                $(this).parents('li[data=aa]').attr('data-s','yes')
            }

        }else{
            if($(this).attr('type')=='checkbox'){
                if($(this).parents('li').find('input:checked').length==0){
                    $(this).parents('li').removeAttr('data-s')
                }
            }
            $(this).next().next().find('span').html('(常态/未选取)');

        }
        if($('li[data=aa]').size()==$('li[data-s=yes]').size()){
            $('#fonts').addClass('fonts')
        }else{
            $('#fonts').removeClass('fonts')
        }
    })
    $('#list_3').on('change','input',function(){
        $(this).parent('div').addClass('se').siblings().removeClass('se')
    })



}

$('#fonts').on('click',function(){
    var parst={};
    if($(this).hasClass('fonts')){
        var parArr=[];
        $('#sent_s li div').each(function(){
            console.log($(this))
            var obj={},idArr=[],qidArr=[],vs=[];
            $(this).find('input:checked').each(function(){
                var id=$(this).attr('id').substr(7),
                    qid=$(this).attr('name').substr(3),
                    svso=$(this).attr('data-s');
                    idArr.push(id);
                    qidArr.push(qid);
                    vs.push(svso);

            })
            obj.titleId=$(this).attr('id')
            obj.id=idArr;
            obj.qid=qidArr;
            obj.vs=vs;
            parArr.push(obj)


        })
        parst.options=parArr;

    }
});



function analysis(){
    var url =decodeURI(document.location.search).substr(1);
    var obj={};
    if(url){
        var showval=url.split('&');
        $.each(showval,function(k,v){
            var arr=v.split('=');
            var a1=arr[0],
                a2=arr[1]
            obj[a1]=a2
        })

    }
    return obj
}
function sss(){
    $('#digbu').on('click',function(){
        myScroll1.scrollTo(0,0,500)
    })


}
sss()

