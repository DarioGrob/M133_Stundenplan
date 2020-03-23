var windowWidth = $(window).width();

$(function(){
	if(windowWidth < 992){
		//wird ausgeführt falls der Bildschirm von anfang an kleiner ist als 992px
		changeSelectionAreaDueToWindowSize();
	}	
});
	//das menü wird angezeigt
	function openMenuOnSmallDevices (){
		$("#selectionArea").removeClass();
		//selectionArea nimmt ganzer bildschirm ein
		$("#selectionArea").addClass("selectionAreaSmallDisplay");
		//button zum schliessen des Menüs wird angezeigt
		$("#closeMenuBtn").css('visibility', 'visible');
	}
	
	//das menü wird geschlossen
	function closeMenuOnSmallDevices (){
		$("#selectionArea").removeClass();
		//selectionsArea wird verschoben dass es nicht mehr angezeigt wird
		$("#selectionArea").addClass("selectionAreaSmall");
	}
	
	//css von elementen wird verändert anhand der grösse des Browserfensters
	function changeSelectionAreaDueToWindowSize (){
		windowWidth = $(window).width();
		if(windowWidth < 992){
			//selectionsArea wird verschoben dass es nicht mehr angezeigt wird
			$("#selectionArea").addClass("selectionAreaSmall");
			//Button zum öffnen des Menü wird angezeigt
			$("#openMenuBtn").css('visibility', 'visible');
			//Stundenplan tabelle wird grösser gemacht		
			$("#tableOutput").addClass("tableSmall");
			//Buttons zum wechseln der Kalenderwochen werden grösser
			$("#kw_left, #kw_right").addClass("kw_buttonSmall");
			//Dropdowns werden grösser
			$("select").addClass("dropdownSmall");
		}else{
			//die verschiebung des selectionsArea wird aufgehoben 
			$("#selectionArea").removeClass();
			//Stundenplan tabelle wird auf normal grösse gesetzt
			$("#tableOutput").removeClass("tableSmall");
			//button zum öffnen des Menüs wird versteckt
			$("#openMenuBtn").css('visibility', 'hidden');
			//button zum schliessen des Menüs wird versteckt
			$("#closeMenuBtn").css('visibility', 'hidden');
			//Dropdowns auf normal grösse gesetzt
			$("select").removeClass("dropdownSmall");
			//Buttons zum wechseln der Kalenderwochen werden auf normal grösse gesetzt
			$("#kw_right, #kw_left").removeClass("kw_buttonSmall");
		}
	}