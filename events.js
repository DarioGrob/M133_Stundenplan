//wird ausgeführt falls die grösse des Browserfensters verändert wird
$(window).resize(function(){
	//ändert css klassen falls grösse unter 992px fällt
	changeSelectionAreaDueToWindowSize();
});

$("#openMenuBtn").click(function(){
	//öffnet das menu
	openMenuOnSmallDevices();
});

$("#closeMenuBtn").click(function(){
	//schliesst das menu
	closeMenuOnSmallDevices();
});

//wird ausgeführt sobald im klassen Dropdown etwas selektiert wurde
$("#classDropdown").change(function(){
	//anzeige der vorherigen Stundenplandaten werden gelöscht
	$("#tableOutput").empty();
	$("#displayResultArea p").remove();
	//datum wird auf aktuelles datum gesetzt
	date = new Date();
	week = date.getWeek() + "-" + date.getFullYear();
	//stundenplandaten werden neu ausgelesen und tabelle zusammengebaut
	getDataFromApi("http://sandbox.gibm.ch/tafel.php?klasse_id=" + $("#classDropdown :selected").val() + "&woche=" + week, "lessons");
});

$("#kw_left").click(function (){
	//anzeige der vorherigen Stundenplandaten werden gelöscht
	$("#tableOutput").empty();
	$("#displayResultArea p").remove();
	//datum wird auf vorherige woche gesetzt
	date.setDate(date.getDate() - 7); 
	week = date.getWeek() + "-" + date.getFullYear();
	//stundenplandaten werden neu ausgelesen und tabelle zusammengebaut
	getDataFromApi("http://sandbox.gibm.ch/tafel.php?klasse_id=" + $("#classDropdown :selected").val() + "&woche=" + week, "lessons");
});

$("#kw_right").click(function (){
	//anzeige der vorherigen Stundenplandaten werden gelöscht
	$("#tableOutput").empty();
	$("#displayResultArea p").remove();
	//datum wird auf nächste woche gesetzt
	date.setDate(date.getDate() + 7);
	week = date.getWeek() + "-" + date.getFullYear();
	//stundenplandaten werden neu ausgelesen und tabelle zusammengebaut
	getDataFromApi("http://sandbox.gibm.ch/tafel.php?klasse_id=" + $("#classDropdown :selected").val() + "&woche=" + week, "lessons");
});

//wird ausgeführt sobald ein job selektiert wird
$("#jobDropdown").change(function(){
	//anzeige der vorherigen Stundenplandaten werden gelöscht
	$("#tableOutput").empty();
	$("#displayResultArea p").remove();
	console.log("test");
	//Kalenderwoche anzeige verstecken
	$("#calenderWeekTitleHidden").css('visibility', 'hidden');
	$("#calenderWeekSelectionHidden").css('visibility', 'hidden');
	//die verschieden klassen werden ausgelesen und das dropdown wird befüllt
	getDataFromApi("http://sandbox.gibm.ch/klassen.php?beruf_id=" + $("#jobDropdown :selected").val(), "#classDropdown");		
});

//wird ausgeführt vor dem verlassen des Browsers
$(window).on('beforeunload', function(){
	//localstorage gelöscht
	localStorage.clear();
	//selektierte value aus den Dropdowns ausgelesen
	var selectedJob = $("#jobDropdown :selected").val();
	var selectedClass = $("#classDropdown :selected").val();
	//falls es nicht die aufforderung zum selektieren eines jobs oder klasse ist, wird es in den localStorage geschrieben
	if(selectedJob != 'select'){
		localstorageSetJobId(selectedJob);
	}
	if(selectedClass != 'select'){
		localstorageSetClassId(selectedClass);
	}
});