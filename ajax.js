function getDataFromApi (url, destination){
	var jsonData;
	$.getJSON(url, function(result){
		jsonData = result;
	})
	.fail(function(){
		alert("Connection to server failed!!!");
	})
	.done(function(){		
		if(destination == "lessons"){
			window[destination] = jsonData;
			displayTable();
		}else{
			$(destination).empty();
			$(destination).append('<option value="select">Select....</option>');
			$.each(jsonData, function(index, value){
				$(destination).append('<option value="' + value[Object.keys(value)[0]] + '">' +  value[Object.keys(value)[1]] + '</option>');
			});
		}
	});
}