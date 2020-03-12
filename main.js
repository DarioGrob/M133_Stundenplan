$(function(){
	var tableTime = ['07:15 - 08:00', '08:05 - 08:50', '08:55 - 09:40', '10:00 - 10:45', '10:50 - 11:35', '12:45 - 13:30', '13:35 - 14:20', '14:20 - 14:40', '14:40 - 15:25', '15:30 - 16:20', '16:20 - 17:05'];  
	var weekdays = ['Montag', 'Dienstag', 'Mitwoch', 'Donnerstag', 'Freitag'];
	var date = new Date();

    $.getJSON("http://sandbox.gibm.ch/berufe.php", function(result){
		$.each(result, function(index, beruf){
            if(beruf.beruf_name != 1){
                $("#jobDropdown").append('<option value="' + beruf.beruf_id + '">' + beruf.beruf_name + '</option>');
            }
        });
	})
	.fail(function(){
		alert("Connection to server faild!!!");
	});
	
	$("#jobDropdown").change(function(){
		$("#classDropdown").empty();
		$("#classDropdown").append('<option value="select">Select....</option>');
		$.getJSON("http://sandbox.gibm.ch/klassen.php?beruf_id=" + $("#jobDropdown :selected").val(), function(result){
            $.each(result, function(index, klasse){
				$("#classDropdown").append('<option value="' + klasse.klasse_id + '">' + klasse.klasse_longname + '</option>');
			}); 
		})
		.fail(function(){
			alert("Connection to server faild!!!");
		});
	});
	
	$("#classDropdown").change(function(){
		var jsonData;
		$.getJSON("http://sandbox.gibm.ch/tafel.php?klasse_id=" + $("#classDropdown :selected").val() + "&woche=" + date.getWeek() + "-" + date.getFullYear() , function(result){
			jsonData = result;
		})
		.fail(function(){
			alert("Connection to server faild!!!");
		})
		.done(function(){
			for(i = 0; i <= tableTime.length; i ++){
				console.group();
				for(j = 0; j <= weekdays.length; j++){
					if(i == 0 && j == 0){
						$("#tableOutput").append("<tr><td></td></tr>");
					}else if(i == 0){
						$("#tableOutput tr").append("<td>" + weekdays[j - 1] + "</td>");
					}else if(j == 0){
						$("#tableOutput").append("<tr><td>" + tableTime[i - 1] + "</td></tr>");
					}else{
						var lesson = jsonData.find(jsonObject => jsonObject.tafel_wochentag == j && jsonObject.tafel_von == tableTime[i - 1].substr(0,5) + ":00") 
						if(lesson){
							var test = i + 1;
							var indexOfTableTime = tableTime.findIndex(s => s.includes(lesson.tafel_bis.substr(0, 5)));
							console.log(indexOfTableTime);
							$("#tableOutput tr:nth-child(" + test + ")").append("<td class='bg-danger'></td>");
						}else{
							var trRow = i + 1;
							$("#tableOutput tr:nth-child(" + trRow + ")").append("<td class='bg-success'></td>");
						}
					}
				}
				console.groupEnd();
			}
		});

	});






	Date.prototype.getWeek = function() {
		var onejan = new Date(this.getFullYear(),0,1);
		return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
	}
});