function analysis(){
    var url =decodeURI(document.location.search).substr(1);
    var obj={};
    if(url){
        var showval=url.split('&');
        $.each(showval,function(k,v){
            var arr=v.split('=');
            var a1=arr[0],
                a2=arr[1];
            obj[a1]=a2
        })
    }
    return obj
}
fenshu()
function fenshu(){

    var ana=analysis();
    $('#fenshu').html(ana.id)
}
