$(function(){
	$(window).resize(function(){
		changeSelectionAreaDueToWindowSize();
	});
	
	$("#openMenuBtn").click(function(){
		openMenuOnSmallDevices();
	});
	
	$("#closeMenuBtn").click(function(){
		closeMenuOnSmallDevices();
	});
	
	$("#classDropdown").change(function(){
		$("#tableOutput").empty();
		$("#displayResultArea p").remove();
		date = new Date();
		week = date.getWeek() + "-" + date.getFullYear();
		getDataFromApi("http://sandbox.gibm.ch/tafel.php?klasse_id=" + $("#classDropdown :selected").val() + "&woche=" + week, "lessons");
	});
	
	$("#kw_left").click(function (){
		$("#tableOutput").empty();
		$("#displayResultArea p").remove();
		date.setDate(date.getDate() - 7); 
		week = date.getWeek() + "-" + date.getFullYear();
		getDataFromApi("http://sandbox.gibm.ch/tafel.php?klasse_id=" + $("#classDropdown :selected").val() + "&woche=" + week, "lessons");
	});
	
	$("#kw_right").click(function (){
		$("#tableOutput").empty();
		$("#displayResultArea p").remove();
		date.setDate(date.getDate() + 7);
		week = date.getWeek() + "-" + date.getFullYear();
		getDataFromApi("http://sandbox.gibm.ch/tafel.php?klasse_id=" + $("#classDropdown :selected").val() + "&woche=" + week, "lessons");
	});
	
	$("#jobDropdown").change(function(){
		$("#tableOutput").empty();
		$("#displayResultArea p").remove();
		getDataFromApi("http://sandbox.gibm.ch/klassen.php?beruf_id=" + $("#jobDropdown :selected").val(), "#classDropdown");		
	});

	$(window).on('beforeunload', function(){
		localStorage.clear();
		var selectedJob = $("#jobDropdown :selected").val();
		var selectedClass = $("#classDropdown :selected").val();
		if(selectedJob != 'select'){
			localstorageSetJobId(selectedJob);
		}
		if(selectedClass != 'select'){
			localstorageSetClassId(selectedClass);
		}
	});
});