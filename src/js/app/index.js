require(["jquery"],function($){
    $.ajax({
        url:"./api/list",
        dataType:"json",
        success:function(res){
            console.log(res);
            var str = "";
            res.data.forEach(function(item){
                str += `<div class="list">
                    <h3>${item.title}</h3>
                    <img src="${item.img}" alt="">
                    <p>${item.name}<span>${item.time}</span></p>
                </div>`;
                
            })
            $(".connent").html(str);
        }
    })
    $("#dest").on("click",function(){
        var index = this.val();
       
    })
})
    
