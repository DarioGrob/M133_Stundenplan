var windowWidth = $(window).width();

$(function(){
	if(windowWidth < 992){
		//$("#titleArea button:first-child").css('visibility', 'visible');
		//$("#selectionArea").addClass("selectionAreaSmall");
		changeSelectionAreaDueToWindowSize();
	}	
});

	function openMenuOnSmallDevices (){
		$("#selectionArea").removeClass();
		$("#selectionArea").addClass("selectionAreaSmallDisplay");
		$("#closeMenuBtn").css('visibility', 'visible');
	}
	
	function closeMenuOnSmallDevices (){
		$("#selectionArea").removeClass();
		$("#selectionArea").addClass("selectionAreaSmall");
	}
	
	function changeSelectionAreaDueToWindowSize (){
		windowWidth = $(window).width();
		if(windowWidth < 992){
			$("#openMenuBtn").css('visibility', 'visible');
			$("#selectionArea").addClass("selectionAreaSmall");		
			$("#tableOutput").addClass("tableSmall");
			$("#kw_left, #kw_right").addClass("kw_buttonSmall");
			$("select").addClass("dropdownSmall");
		}else{
			$("#selectionArea").removeClass();
			$("#tableOutput").removeClass("tableSmall");
			$("#openMenuBtn").css('visibility', 'hidden');
			$("#closeMenuBtn").css('visibility', 'hidden');
			$("#closeMenuBtn").css('visibility', 'hidden');
			$("select").removeClass("dropdownSmall");
			$("#kw_right, #kw_left").removeClass("kw_buttonSmall");
		}
	}