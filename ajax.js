//holt daten per ajax und befüllt entweder direkt die dropdowns oder resultat wird in eine vaiable geschrieben 
function getDataFromApi (url, destination, localstorage){
	var jsonData;
	$.getJSON(url, function(result){
		jsonData = result;
	})
	//bei fehlschlag fehlermeldung anzeigen
	.fail(function(){
		alert("Connection to server failed!!!");
	})
	.done(function(){	
		//falls destiation eine variable ist (lesson)
		//ist nur der fall beim holen der stundenplandaten	
		if(destination == "lessons"){
			window[destination] = jsonData;
			//tabelle aufbauen
			displayTable();
		}else{
			//dropdown löschen
			$(destination).empty();
			//selektions aufforderung in dropdown hinzufügen
			$(destination).append('<option value="select">Select...</option>');
			//dropdown optionen hinzufügen
			$.each(jsonData, function(index, value){
				$(destination).append('<option value="' + value[Object.keys(value)[0]] + '">' +  value[Object.keys(value)[1]] + '</option>');
			});
			//falls daten vom localstorage mitgegeben wurde, der richtigen dropdown option das attriput selected hinzufügen
			if(localstorage){
				$(destination + " option[value='" + localstorage + "']").attr("selected", 'true');
			}
		}
	});
}