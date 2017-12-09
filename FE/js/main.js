$(".table_select_slide").css("display","none");
		$(".tittle_table_select_button").click(function(){
    		$(".table_select_slide").stop(true, false).slideDown();
		});
		$(".table_select_slide ul li").click(function(){
			$(".tittle_table_select_button").text($(this).text());
			$(".table_select_slide").stop(true, false).slideUp();
		})