$(document).ready(function(){
    //实例化 trackDB_handler.track_db_handler()
    var track_db_handler = new trackDB_handler.track_db_handler();

    $("#track_back_btn").mouseover(function(){
		$("#track_back_btn").css("background-image","url(./images/back_pressed_btn.png)");
	});
	$("#track_back_btn").mouseleave(function(){
		$("#track_back_btn").css("background-image","url(./images/back_btn.png)");
	});

	$("#track_action_btn").click(function(){
		if($("#action_menu").is(":visible")){
			$("#track_action_btn").css("background-image","url(./images/action_btn.png)");
			$("#action_menu").slideUp();
		}else{
			$("#track_action_btn").css("background-image","url(./images/action_pressed_btn.png)");
			$("#action_menu").slideDown();
		}
	});

    var month = (new Date().getMonth()+1).toString();
    month = track_db_handler.monthFormat(month);
    $("#month").text(month);
    var date = new Date().getDate().toString();
    $("input[id='date']").val(date);
});